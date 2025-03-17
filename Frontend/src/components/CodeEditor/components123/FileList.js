import React, { useState, useEffect } from 'react';
import { listFiles, deleteFile } from '../api/api';
import { toast } from 'react-toastify';

const FileList = ({ token }) => {
    const [files, setFiles] = useState([]);

    useEffect(() => {
        fetchFiles();
    }, []);

    const fetchFiles = async () => {
        try {
            const response = await listFiles(token);
            const aryan = setFiles(response.data.files[0].files);
            console.log(response.data.files[0].files)
        } catch (error) {
            toast.error("Failed to fetch files.");
        }
    };

    const handleDelete = async (filename) => {
        try {
            await deleteFile(filename, token);
            setFiles(files.filter(file => file !== filename));
            toast.success("File deleted successfully!");
        } catch (error) {
            toast.error("Failed to delete file.");
        }
    };

    return (
        <div>
            <h2>Uploaded Files</h2>
            <ul>
                {files.map((file, index) => (
                    <li key={index}>
                        {file} 
                        <button onClick={() => handleDelete(file)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default FileList;
