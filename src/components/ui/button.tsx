import { ButtonHTMLAttributes } from "react";

export default function Button(props: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className="rounded-md bg-zinc-900 text-zinc-50 p-2"
      {...props}
    ></button>
  );
}
