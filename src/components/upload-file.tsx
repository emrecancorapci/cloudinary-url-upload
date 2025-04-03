import { useEffect, useState } from "react";
import { UploadResponse, UploadSignature } from "../types";

export default function UploadFile({
  file,
  uploadSign,
}: {
  file: File;
  uploadSign: UploadSignature;
}) {
  const [imgUrl, setImgUrl] = useState<string | undefined>();

  useEffect(() => {
    const uploadFile = async () => {
      try {
        const url = `https://api.cloudinary.com/v1_1/${uploadSign.cloudname}/auto/upload`;
        const formData = new FormData();

        formData.set("file", file);
        formData.set("api_key", uploadSign.apiKey);
        formData.set("timestamp", String(uploadSign.timestamp));
        formData.set("signature", uploadSign.signature);

        for (const { key, value } of uploadSign.params) {
          formData.set(key, String(value));
        }

        // for (const pair of formData.entries()) {
        //   console.log(pair[0], pair[1]);
        // }

        const response = await fetch(url, { method: "POST", body: formData });

        if (!response.ok) throw new Error("Upload failed");
        const responseObject = (await response.json()) as UploadResponse;

        setImgUrl(responseObject.secure_url);
      } catch (error) {
        console.error("Upload error:", error);
      }
    };

    if (file && uploadSign)
      uploadFile()
        .then(() => {})
        .catch(() => {});
  }, [file, uploadSign]);

  return (
    <div>
      {imgUrl ? (
        <img src={imgUrl} alt="Uploaded file" className="rounded-lg shadow" />
      ) : (
        <p>Uploading...</p>
      )}
    </div>
  );
}
