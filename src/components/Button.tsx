const Button = (props: React.ComponentPropsWithoutRef<"button">) => {
  return (
    <button
      {...props}
      className="rounded bg-blue-500 px-4 py-2 hover:bg-blue-300"
    >
      {props.children}
    </button>
  );
};

export default Button;
