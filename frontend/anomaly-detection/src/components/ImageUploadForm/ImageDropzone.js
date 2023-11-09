// import useDropzone hook from react-dropzone package
import { useDropzone } from "react-dropzone";
import "./imageUploadForm.css";

import { useCallback, useState, useMemo } from "react";

export default function ImageDropzone() {
    const [selectedImages, setSelectedImages] = useState([]);
    const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
        acceptedFiles.forEach((file) => {
            setSelectedImages((prevState) => [...prevState, file]);
        });
    }, [])
    
    const  {
        getRootProps,
        getInputProps,
        isDragActive,
        isDragAccept,
        isDragReject,
    } = useDropzone({ onDrop, accept: "image/png" });

    return (
        <div className="container">
            <div className="dropzone" {...getRootProps()}>
                <input {...getInputProps()} />
                {isDragActive ? (
                    <p>Drop image(s) here ...</p>
                ) : (
                    <p>Drag and drop image(s) here, or click to select images</p>
                )}
            </div>
            <div className="images">
                {selectedImages.length > 0 && selectedImages.map((image, index) => (
                    <img src={`${URL.createObjectURL(image)}`} key={index} alt="" />
                ))}
            </div>
        </div>
    );
}