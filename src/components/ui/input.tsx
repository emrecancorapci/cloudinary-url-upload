import { InputHTMLAttributes } from "react";

export default function Input(props: InputHTMLAttributes<HTMLInputElement>) {
  return <input className="p-2 rounded-md bg-zinc-100" {...props}></input>;
}
