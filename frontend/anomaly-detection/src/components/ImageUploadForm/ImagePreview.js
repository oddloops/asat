import React from "react";

export default function ImagePreview({ selectedImage }) {
    return (
        <div className="images">
            {selectedImage && (
                <img src={URL.createObjectURL(selectedImage)} alt="Uploaded" />
            )}
        </div>
    );
}