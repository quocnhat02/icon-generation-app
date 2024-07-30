import clsx from "clsx";
import Link, { type LinkProps } from "next/link";
import { type ReactNode } from "react";

const PrimaryLinkButton = (
  props: LinkProps & { children: ReactNode; className?: string }
) => {
  const { className, ...propsWithoutClassName } = props;

  return (
    <Link
      className={clsx(
        "rounded bg-blue-500 px-4 py-2 hover:bg-blue-300",
        className ?? ""
      )}
      {...propsWithoutClassName}
    >
      {props.children}
    </Link>
  );
};

export default PrimaryLinkButton;
