import PrimaryLink from "./PrimaryLink";
import { signIn, signOut, useSession } from "next-auth/react";
import Button from "./Button";
import { useBuyCredits } from "~/hooks/useBuyCredits";
import { api } from "~/utils/api";

const Header = () => {
  const { buyCredits } = useBuyCredits();

  const session = useSession();

  const credits = api.user.getCredits.useQuery();

  const isLoggedIn = !!session.data;

  return (
    <header className="mx-auto mb-4 flex h-16 w-full content-center items-center justify-between bg-gray-600 px-4">
      <PrimaryLink href={"/"}>Icon Creator</PrimaryLink>
      <ul className="flex gap-2">
        <li>
          <PrimaryLink href={"/generate"}>Generate</PrimaryLink>
        </li>
        {isLoggedIn && (
          <li>
            <PrimaryLink href={"/collection"}>Collection</PrimaryLink>
          </li>
        )}
      </ul>
      <ul className="flex items-center gap-4">
        {isLoggedIn && (
          <>
            Credits remaining {credits.data}
            <li>
              <Button
                onClick={() => {
                  buyCredits().catch(console.error);
                }}
              >
                Buy Credits
              </Button>
            </li>
            <li>
              <Button
                variant="secondary"
                onClick={() => {
                  signOut().catch(console.error);
                }}
              >
                Logout
              </Button>
            </li>
          </>
        )}
        {!isLoggedIn && (
          <li>
            <Button
              onClick={() => {
                signIn().catch(console.error);
              }}
            >
              Login
            </Button>
          </li>
        )}
      </ul>
    </header>
  );
};

export default Header;
