import { gql, useMutation } from "@apollo/client";
import GetUploadSignatureForm from "./upload-signature-form";
import { UploadSignature } from "../types";

export default function GetUploadSignature({
  setFile,
  setUploadSign,
}: {
  setFile: (file: File) => void;
  setUploadSign: (signData: UploadSignature) => void;
}) {
  const [createUploadSignature, { loading, error }] = useMutation<
    Response,
    RequestParams
  >(UPLOAD_SIGNATURE_MUTATION, {
    onCompleted: (data) => setUploadSign(data.createUploadSignature),
  });

  const onSubmit = async (d: FormData) => {
    const filename = d.fileList[0].name;

    await createUploadSignature({
      variables: { filename },
    });

    setFile(d.fileList[0]);
  };

  return (
    <div className="flex flex-col w-full justify-center items-center">
      {!loading && (
        <>
          <GetUploadSignatureForm onSubmit={onSubmit}></GetUploadSignatureForm>
          {error && <p className="font-extrabold">ERROR: {error.message}</p>}
        </>
      )}
    </div>
  );
}

type Response = {
  createUploadSignature: UploadSignature;
};

type RequestParams = {
  filename: string;
};

type FormData = {
  fileList: FileList;
};

const UPLOAD_SIGNATURE_MUTATION = gql`
  mutation CreateUploadSignature($filename: String!) {
    createUploadSignature(filename: $filename) {
      signature
      timestamp
      cloudname
      apiKey
      params {
        key
        value
      }
    }
  }
`;
