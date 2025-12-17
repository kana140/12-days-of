import clsx from "clsx";
import { lusitana } from "./fonts";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export function Button({ children, className, ...rest }: ButtonProps) {
  return (
    <button
      {...rest}
      className={clsx(
        `${lusitana.className} bg-button hover:bg-button-1000 px-5 w-32 h-16 rounded-4xl cursor-pointer text-gray-800 dark:bg-accent dark:text-primary`,
        className
      )}
    >
      {children}
    </button>
  );
}
