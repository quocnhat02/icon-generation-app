import clsx from "clsx";
import Spinner from "./Spinner";

const Button = (
  props: React.ComponentPropsWithoutRef<"button"> & {
    variant?: "primary" | "secondary";
    isLoading?: boolean;
  }
) => {
  const color =
    (props.variant ?? "primary") === "primary"
      ? "bg-blue-500 hover:bg-blue-300"
      : "bg-gray-500 hover:bg-gray-300";

  return (
    <button
      {...props}
      className={clsx(
        "flex items-center justify-center gap-2 rounded px-4 py-2 disabled:bg-gray-500",
        color
      )}
    >
      {props.isLoading && <Spinner />}
      {props.children}
    </button>
  );
};

export default Button;
