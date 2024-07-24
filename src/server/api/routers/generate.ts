import { TRPCError } from "@trpc/server";
import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

import OpenAI from "openai";
import { env } from "~/env.mjs";

const openai = new OpenAI({
  apiKey: env.DALLE_API_KEY,
});

export const generateRouter = createTRPCRouter({
  generateIcon: protectedProcedure
    .input(
      z.object({
        prompt: z.string(),
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

      //   TODO: make a fetch request to DALLE api
      const response = await openai.images.generate({
        model: "dall-e-3",
        prompt: input.prompt,
        n: 1,
        size: "1024x1024",
      });

      const url = response.data[0]?.url;

      return {
        imageUrl: url,
      };
    }),
});
