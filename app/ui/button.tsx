import clsx from "clsx";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export function Button({ children, className, ...rest }: ButtonProps) {
  return (
    <button
      {...rest}
      className={clsx(
        `bg-button pixel-corners hover:bg-hover p-2 cursor-pointer text-gray-800 dark:bg-accent dark:text-primary`,
        className,
      )}
    >
      {children}
    </button>
  );
}
