import { useForm, SubmitHandler } from "react-hook-form";
import Button from "./ui/button";
import Input from "./ui/input";

type Inputs = { email: string; password: string };

export default function LoginForm({
  onSubmit,
}: {
  onSubmit: SubmitHandler<Inputs>;
}) {
  const { register, handleSubmit } = useForm<Inputs>();

  return (
    <form
      className="flex flex-col max-w-sm gap-4 p-8 w-full rounded-md bg-zinc-200"
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      onSubmit={handleSubmit(onSubmit)}
    >
      <Input type="email" {...register("email")}></Input>
      <Input type="password" {...register("password")}></Input>
      <Button type="submit">Submit</Button>
    </form>
  );
}
