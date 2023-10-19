// Image Upload Form to allow fo uploading of satellite images
import React, { useState, useEffect } from "react";
import "./imageUploadForm.css"

function ImageUploadForm() {
    
    const [imageFiles, setImageFiles] = useState([])
    const [imageURLs, setImageURLs] = useState([])

    useEffect(() => {
        if (imageFiles && imageFiles.length < 1) {
            return;
        }
        const newImageUrls = []
        imageFiles.forEach(image => newImageUrls.push(URL.createObjectURL(image)))
        setImageURLs(newImageUrls)

        // Clean up previous object URLs when component unmounts
        return () => {
            newImageUrls.forEach((url) => URL.revokeObjectURL(url));
        };
    }, [imageFiles])

    // Event handler for image upload
    function handleChange(e) {
        const files = e.target.files;
        setImageFiles(prevFiles => [...prevFiles, ...files]);
    }

    // Event handler to remove uploaded images
    function handleImageRemoval(index) {
        const updatedFiles = [...imageFiles]
        updatedFiles.splice(index, 1);
        setImageFiles(prevFiles => updatedFiles)

        const updatedURLs = [...imageURLs];
        updatedURLs.splice(index, 1);
        setImageURLs(updatedURLs);
    }

    // Event handler for click removal
    function handleImageRemovalClick(index) {
        handleImageRemoval(index)
    }

    // Event handler for submitting image files
    function handleSubmit() {
        const formData = new FormData()
        imageFiles.forEach((image) => {
            formData.append("files", image)
        })

        try {
            console.log("Uploaded")
        } catch (error) {
            console.error("Whoops")
        }
    }
    
    return (
        <div>
            <h2>Upload an image</h2>

            {/* Image file Upload */}
            <input type="file" accept="image/*" onChange={handleChange} />
            <button onClick={handleSubmit} disabled={imageFiles.length === 0}>
                Submit
            </button>

            {/* Uploaded Image Preview */}
            <h3>Preview</h3>
            <div className="image-preview-bar">
                {imageURLs.map((imageSrc, index) => (
                <div
                    key={index}
                    className="image-preview-container"
                    onClick={() => handleImageRemovalClick(index)}
                >
                    <img src={imageSrc} alt="" className="temp-resize" />
                </div>
                ))}
            </div>
        </div>
    )
}

export default ImageUploadForm