// import useDropzone hook from react-dropzone package
import { useDropzone } from "react-dropzone";
import "./imageUploadForm.css";

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
    }, [])

    const uploadImage = () => {
        if (selectedImage) {
            console.log("Uploaded");
            navigate("/ex-color");
        } else {
            console.warn("No image selected to upload.");
        }
    }

    const clearImage = () => {
        setSelectedImage(null);
    };

    const {
        getRootProps,
        getInputProps,
        isDragActive,
        isDragAccept,
        isDragReject,
    } = useDropzone({ 
            onDrop, 
            accept: "image/jpeg ,image/png", 
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
            <ImageButtons handleUpload={uploadImage} clearUpload={clearImage}/>
        </div>
    );
}