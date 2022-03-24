import React, { useState } from "react";
import Axios from "axios";

export let arr = [];

export const UploadingImages = (params) => {
  const [uploadIm, SetUploadIm] = useState();

  const uploadImage = (files) => {
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append("file", files[i]);
      formData.append("upload_preset", "ecommerce");
      Axios.post(
        "https://api.cloudinary.com/v1_1/dmjbff5rm/image/upload",
        formData
      ).then((res) => {
        arr.push(res.data.secure_url);
      });
    }
  };
  console.log();
  return (
    <div>
      <input
        type="file"
        multiple
        onChange={(e) => {
          uploadImage(e.target.files);
        }}
      ></input>
      <button onClick={uploadImage}>Upload Image</button>
    </div>
  );
};
