import { SubmitHandler, useForm } from "react-hook-form";
import Button from "./ui/button";
import Input from "./ui/input";

export default function GetUploadSignatureForm({
  onSubmit,
}: {
  onSubmit: SubmitHandler<{ fileList: FileList }>;
}) {
  const { register, handleSubmit } = useForm<{ fileList: FileList }>();

  return (
    <form
      className="flex max-w-md gap-4 p-8 w-full rounded-md bg-zinc-400 items-center justify-center"
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      onSubmit={handleSubmit(onSubmit)}
    >
      <Input
        type="file"
        {...register("fileList", { required: "File is required" })}
      />

      <Button type="submit">Submit</Button>
    </form>
  );
}
