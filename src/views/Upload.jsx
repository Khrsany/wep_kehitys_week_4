// src/views/Upload.jsx

import { useState } from "react";
import useForm from "../hooks/formHooks";
import { useFile, useMediaUpload } from "../hooks/apiHooks";

export default function Upload() {
  const { postFile } = useFile();
  const { postMedia } = useMediaUpload();

  const [file, setFile] = useState(null);

  const initValues = {
    title: "",
    description: "",
  };

  const doUpload = async () => {
    try {
      if (!file) {
        alert("Select a file first!");
        return;
      }

      console.log("Selected file:", file);

      // 1️⃣ Lähetä varsinainen tiedosto upload-serverille
      const uploadResponse = await postFile(file);
      console.log("File upload response:", uploadResponse);

      const token = localStorage.getItem("token");
      if (!token) {
        alert("You must be logged in!");
        return;
      }

      // 2️⃣ Lähetä metatiedot MEDIA API:lle
      const metadata = {
        title: inputs.title,
        description: inputs.description,
        media_type: uploadResponse.media_type,
        filename: uploadResponse.filename,
        filesize: uploadResponse.filesize,
      };

      const mediaResponse = await postMedia(metadata, token);
      console.log("Media upload response:", mediaResponse);

      alert("File uploaded successfully!");
    } catch (err) {
      alert("Upload failed. Check console.");
      console.error(err);
    }
  };

  const { inputs, handleInputChange, handleSubmit } = useForm(
    doUpload,
    initValues
  );

  return (
    <>
      <h1>Upload Media</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Select file:</label>
          <input type="file" onChange={(e) => setFile(e.target.files[0])} />
        </div>

        <div>
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={inputs.title}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <label>Description:</label>
          <input
            type="text"
            name="description"
            value={inputs.description}
            onChange={handleInputChange}
          />
        </div>

        <button type="submit">Upload</button>
      </form>
    </>
  );
}
