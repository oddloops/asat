import { useDropzone } from "react-dropzone";
import { useCallback, useState } from "react";
import ImagePreview from "./ImagePreview";
import ImageButtons from "./ImageButtons";
import { useNavigate } from "react-router-dom";

export default function ImageDropzone() {
  const [selectedImage, setSelectedImage] = useState(null);
  const navigate = useNavigate();

  // Callback function when an image is dropped
  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    if (acceptedFiles.length === 1) {
      setSelectedImage(acceptedFiles[0]);
    } else {
      console.warn("Please select only one image.");
    }
  }, []);

  // Function to upload the selected image
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

  // Function to clear the selected image
  const clearImage = () => {
    setSelectedImage(null);
  };

  // Dropzone configuration
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: "image/jpeg, image/png",
    multiple: false,
  });

  return (
    <div className="container">
      {/* Dropzone area */}
      <div className="dropzone" {...getRootProps()}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop image here...</p>
        ) : (
          <p>Drag and drop an image here, or click to select an image</p>
        )}
      </div>

      {/* Image preview component */}
      <ImagePreview selectedImage={selectedImage} />

      {/* Image upload and clear buttons */}
      <ImageButtons handleUpload={uploadImage} clearUpload={clearImage} />
    </div>
  );
}
