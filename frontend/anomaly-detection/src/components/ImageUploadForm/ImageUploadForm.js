// Image Upload Form to allow fo uploading of satellite images
import React, { useState, useEffect } from "react";

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
    }, [imageFiles])

    function handleChange(e) {
        console.log(e.target.files)
        setImageFiles([...e.target.files])
    }

    return (
        <div>
            <h2>Upload an image</h2>
            <input type="file" accept="image/*" onChange={handleChange} />
            { imageURLs.map(imageSrc => <img src={imageSrc} alt=""/>)}
        </div>
    )
}

export default ImageUploadForm