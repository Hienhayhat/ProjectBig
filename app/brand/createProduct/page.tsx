'use client'
const axios = require('axios');
import { useState } from 'react';

export default function FileUpload() {
    const [file, setFile] = useState(null);
    const [uploadResponse, setUploadResponse] = useState(null);

    const handleFileChange = (e: any) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = async () => {
        if (!file) return alert('Please select a file.');

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await axios.post('http://localhost:8000/products/file', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setUploadResponse(response.data);
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };

    return (
        <div>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload}>Upload</button>
            {uploadResponse && <div>Upload successful: {JSON.stringify(uploadResponse)}</div>}
        </div>
    );
}