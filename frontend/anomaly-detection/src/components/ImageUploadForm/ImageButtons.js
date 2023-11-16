import React from "react";

export default function ImageButtons({ handleUpload, clearUpload}) {
    return (
        <div className="buttons">
            <button onClick={handleUpload}>Upload</button>
            <button onClick={clearUpload}>Clear</button>
        </div>
    );
}