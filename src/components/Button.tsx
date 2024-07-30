import clsx from "clsx";

const Button = (
  props: React.ComponentPropsWithoutRef<"button"> & {
    variant?: "primary" | "secondary";
  }
) => {
  const color =
    (props.variant ?? "primary") === "primary"
      ? "bg-blue-500 hover:bg-blue-300"
      : "bg-gray-500 hover:bg-gray-300";

  return (
    <button {...props} className={clsx("rounded px-4 py-2", color)}>
      {props.children}
    </button>
  );
};

export default Button;
