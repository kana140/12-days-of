import clsx from "clsx";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export function Input({ className, ...rest }: InputProps) {
  return (
    <input
      {...rest}
      className={clsx(
        "peer block w-full rounded-md border border-gray-200 py-[9px] pl-5 text-sm outline-2 dark:border-accent dark:outline-0 text-black",
        className
      )}
    />
  );
}
