import Link from "next/link";
import PrimaryLink from "./PrimaryLink";
import { signIn, signOut, useSession } from "next-auth/react";
import Button from "./Button";

const Header = () => {
  const session = useSession();

  const isLoggedIn = !!session.data;

  return (
    <header className="container mx-auto flex h-16 items-center justify-between px-4">
      <PrimaryLink href={"/"}>Icon Creator</PrimaryLink>
      <ul>
        <li>
          <PrimaryLink href={"/generate"}>Generate</PrimaryLink>
        </li>
      </ul>
      <ul>
        {isLoggedIn && (
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
