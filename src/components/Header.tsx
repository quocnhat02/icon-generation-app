import PrimaryLink from "./PrimaryLink";
import { signIn, signOut, useSession } from "next-auth/react";
import Button from "./Button";
import { useBuyCredits } from "~/hooks/useBuyCredits";

const Header = () => {
  const { buyCredits } = useBuyCredits();

  const session = useSession();

  const isLoggedIn = !!session.data;

  return (
    <header className="container mx-auto flex h-16 content-center items-center justify-between px-4">
      <PrimaryLink href={"/"}>Icon Creator</PrimaryLink>
      <ul>
        <li>
          <PrimaryLink href={"/generate"}>Generate</PrimaryLink>
        </li>
      </ul>
      <ul className="flex gap-4">
        {isLoggedIn && (
          <>
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
