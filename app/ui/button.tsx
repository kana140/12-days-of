import clsx from "clsx";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export function Button({ children, className, ...rest }: ButtonProps) {
  return (
    <button
      {...rest}
      className={clsx(
        "bg-button hover:bg-button-800 w-32 h-16 rounded-4xl cursor-pointer",
        className
      )}
    >
      {children}
    </button>
  );
}
