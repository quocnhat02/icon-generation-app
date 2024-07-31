import { type NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { api } from "~/utils/api";

const CollectionPage: NextPage = () => {
  const icons = api.icons.getIcons.useQuery();
  return (
    <>
      <Head>
        <title>Your Icons</title>
        <meta name="description" content="Your icons" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="container mx-auto flex min-h-screen w-full flex-col items-center gap-4 px-8">
        <h1 className="text-4xl">Your Icons</h1>
        <ul className="grid w-full grid-cols-2 gap-4 p-4 md:grid-cols-4">
          {icons.data?.map((icon) => (
            <li key={icon.id}>
              <Image
                alt={`${icon.prompt}`}
                src={`https://icon-creater-project.s3.amazonaws.com/${icon.id}`}
                width={100}
                height={100}
                className="w-full"
              />
            </li>
          ))}
        </ul>
      </main>
    </>
  );
};

export default CollectionPage;
