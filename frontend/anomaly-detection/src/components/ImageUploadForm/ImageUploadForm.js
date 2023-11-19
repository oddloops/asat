import { useDropzone } from "react-dropzone";
import { useCallback, useState } from "react";
import ImagePreview from "./ImagePreview";
import ImageButtons from "./ImageButtons";
import { useNavigate } from "react-router-dom";

export default function ImageDropzone() {
  const [selectedImage, setSelectedImage] = useState(null);
  const navigate = useNavigate();

  const onDrop = useCallback((acceptedFile, rejectedFile) => {
    if (acceptedFile.length === 1) {
      setSelectedImage(acceptedFile[0]);
    } else {
      console.warn("Please select only one image.");
    }
  }, []);

  const uploadImage = async () => {
    if (selectedImage) {
      const formData = new FormData();
      formData.append("image", selectedImage);

      try {
        const response = await fetch("http://localhost:8000/color_app/api/colors/", {
          method: "POST",
          body: formData,
        });

        if (response.ok) {
          console.log("Image uploaded successfully");
          navigate("/ex-color");
        } else {
          console.error("Error uploading image");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    } else {
      console.warn("No image selected to upload.");
    }
  };

  const clearImage = () => {
    setSelectedImage(null);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: "image/jpeg,image/png",
    multiple: false,
  });

  return (
    <div className="container">
      <div className="dropzone" {...getRootProps()}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop image(s) here ...</p>
        ) : (
          <p>Drag and drop an image here, or click to select an image</p>
        )}
      </div>
      <ImagePreview selectedImage={selectedImage} />
      <ImageButtons handleUpload={uploadImage} clearUpload={clearImage} />
    </div>
  );
}
