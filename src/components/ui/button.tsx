import { ButtonHTMLAttributes } from "react";

export default function Button({
  type,
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type={type ?? "button"}
      className={"rounded-md bg-zinc-950 text-zinc-50 p-2 hover:bg-zinc-800 transition " + className}
      {...props}
    ></button>
  );
}
