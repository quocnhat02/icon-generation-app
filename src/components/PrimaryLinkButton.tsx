import Link, { type LinkProps } from "next/link";
import { type ReactNode } from "react";

const PrimaryLinkButton = (props: LinkProps & { children: ReactNode }) => {
  return (
    <Link
      className="rounded bg-blue-500 px-4 py-2 hover:bg-blue-300"
      {...props}
    >
      {props.children}
    </Link>
  );
};

export default PrimaryLinkButton;
