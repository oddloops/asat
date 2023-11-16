// import useDropzone hook from react-dropzone package
import { useDropzone } from "react-dropzone";
import "./imageUploadForm.css";

import { useCallback, useState } from "react";

export default function ImageDropzone() {
    const [selectedImage, setSelectedImage] = useState(null);

    const onDrop = useCallback((acceptedFile, rejectedFile) => {
        if (acceptedFile.length === 1) {
            setSelectedImage(acceptedFile[0]);
        } else {
            console.warn("Please select only one image.");
        }
    }, [])

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
            accept: "image/*", 
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
            <div className="images">
                {selectedImage && (
                    <img src={URL.createObjectURL(selectedImage)} alt="Uploaded" />
                )}
            </div>
            <button onClick={clearImage}>Clear</button>
        </div>
    );
}