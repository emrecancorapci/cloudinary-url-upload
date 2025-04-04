import { gql, useMutation } from "@apollo/client";
import GetUploadSignatureForm from "./upload-signature-form";
import { UploadSignature } from "../types";

export default function GetUploadSignature({
  setFile,
  setUploadSign,
  isPrivate,
}: {
  setFile: (file: File) => void;
  setUploadSign: (signData: UploadSignature) => void;
  isPrivate?: boolean;
}) {
  const [createUploadSignature, { loading, error }] = useMutation<
    Response,
    RequestParams
  >(UPLOAD_SIGNATURE_MUTATION, {
    onCompleted: (data) => setUploadSign(data.createUploadSignature),
  });

  const onSubmit = async (d: FormData) => {
    const filename = d.fileList[0].name;
    const variables = { filename };

    if (isPrivate) {
      Object.assign(variables, { isPrivate });
    }

    await createUploadSignature({ variables });

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
  mutation CreateUploadSignature($filename: String!, $isPrivate: Boolean) {
    createUploadSignature(filename: $filename, isPrivate: $isPrivate) {
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
