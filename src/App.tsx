import { useState } from "react";
import { UploadSignature } from "./types";
import Login from "./components/login";
import Button from "./components/ui/button";
import GetUploadSignature from "./components/upload-signature";
import UploadFile from "./components/upload-file";

function App() {
  const [token, setToken] = useState<string | undefined>(undefined);
  const [file, setFile] = useState<File | undefined>(undefined);
  const [uploadSign, setUploadSign] = useState<UploadSignature | undefined>();

  return (
    <div className="flex w-screen h-screen flex-col gap-16 justify-center items-center p-16">
      <h1 className="font-light text-6xl text-zinc-700">File Upload</h1>
      {!token && <Login setToken={setToken} />}
      {token && !uploadSign && (
        <div className="flex flex-col gap-4">
          <GetUploadSignature setFile={setFile} setUploadSign={setUploadSign} />
          <Button type="button" onClick={() => setToken(undefined)}>
            Logout
          </Button>
        </div>
      )}
      {token && uploadSign && file && (
        <UploadFile file={file} uploadSign={uploadSign} />
      )}
    </div>
  );
}

export default App;
