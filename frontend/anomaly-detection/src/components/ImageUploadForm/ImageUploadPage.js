import React from "react";
import ImageDropzone from "./ImageDropzone";

export default function ImageUploadPage() {
    return (
      <div className="container">
        <h2>Upload Images</h2>
        <ImageDropzone/>
      </div>  
    );
}