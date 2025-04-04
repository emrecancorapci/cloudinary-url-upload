import { useState } from "react";
import { UploadSignature } from "./types";
import Login from "./components/login";
import Button from "./components/ui/button";
import GetUploadSignature from "./components/upload-signature";
import UploadFile from "./components/upload-file";

function App() {
  const [token, setToken] = useState<string | undefined>(undefined);
  const [privateMode, setPrivateMode] = useState<boolean>(false);
  const [file, setFile] = useState<File | undefined>(undefined);
  const [uploadSign, setUploadSign] = useState<UploadSignature | undefined>();

  return (
    <div className="flex w-screen h-screen justify-center items-center bg-zinc-950">
      <div className="flex flex-col gap-16 rounded-lg justify-center items-center bg-zinc-200 p-8">
        <h1 className="font-light text-6xl text-zinc-700 p-8">File Upload</h1>
        {!token && <Login setToken={setToken} />}
        {token && !uploadSign && (
          <div className="flex flex-col gap-4">
            <GetUploadSignature
              setFile={setFile}
              setUploadSign={setUploadSign}
            />
            <div className="flex flex-row gap-4 justify-center items-center">
              <p className="font-light text-lg">Private Mode:</p>
              <button
                className={`rounded-md p-2 text-center w-20 ${
                  privateMode
                    ? "bg-zinc-900 text-zinc-50 hover:bg-zinc-700"
                    : "bg-white text-zinc-900 hover:bg-zinc-100"
                }`}
                type="button"
                onClick={() => setPrivateMode((v) => !v)}
              >
                <span className="font-bold">{privateMode ? "On" : "Off"}</span>
              </button>
            </div>
            <Button
              type="button"
              className="mt-20 mx-32"
              onClick={() => setToken(undefined)}
            >
              Logout
            </Button>
          </div>
        )}
        {token && uploadSign && file && (
          <UploadFile file={file} uploadSign={uploadSign} />
        )}
      </div>
    </div>
  );
}

export default App;
