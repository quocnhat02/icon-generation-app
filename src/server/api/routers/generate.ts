import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

import OpenAI from "openai";
import { env } from "~/env.mjs";
import { b64Image } from "~/data/b64Image";
import AWS from "aws-sdk";

const s3 = new AWS.S3({
  credentials: {
    accessKeyId: env.ACCESS_KEY_ID,
    secretAccessKey: env.SECRET_ACCESS_KEY,
  },
  region: "ap-southeast-1",
});

const BUCKET_NAME = "icon-creater-project";

const openai = new OpenAI({
  apiKey: env.DALLE_API_KEY,
});

async function generateIcon(prompt: string): Promise<string | undefined> {
  if (env.MOCK_DALLE === "true") {
    return b64Image;
  } else {
    const response = await openai.images.generate({
      model: "dall-e-2",
      prompt: prompt,
      n: 1,
      size: "512x512",
      response_format: "b64_json",
    });

    return response.data[0]?.b64_json;
  }
}

export const generateRouter = createTRPCRouter({
  generateIcon: protectedProcedure
    .input(
      z.object({
        prompt: z.string(),
        color: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      console.log("we are here", input.prompt);

      // TODO: verify the user has enough credits
      const { count } = await ctx.prisma.user.updateMany({
        where: {
          id: ctx.session.user.id, // TODO: replace with a real id
          credits: {
            gte: 1,
          },
        },
        data: {
          credits: {
            decrement: 1,
          },
        },
      });

      if (count <= 0) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "you do not have enough credits",
        });
      }

      const finalPrompt = `a modern icon in ${input.color} of ${input.prompt}`;

      //   TODO: make a fetch request to DALLE api
      const base64EncodedImage = await generateIcon(finalPrompt);

      const icon = await ctx.prisma.icon.create({
        data: {
          prompt: input.prompt,
          userId: ctx.session.user.id,
        },
      });

      // TODO: save S3
      await s3
        .putObject({
          Bucket: "icon-creater-project",
          Body: Buffer.from(base64EncodedImage!, "base64"),
          Key: icon.id,
          ContentEncoding: "base64",
          ContentType: "image/png",
        })
        .promise();

      return {
        imageUrl: `https://${BUCKET_NAME}.s3.amazonaws.com/${icon.id}`,
      };
    }),
});
