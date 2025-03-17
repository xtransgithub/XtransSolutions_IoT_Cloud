import React, { useState } from 'react';
import { uploadFile } from '../api/api';
import { toast } from 'react-toastify';
import { Box, Button, Typography, Paper } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const FileUpload = ({ token }) => {
    const [file, setFile] = useState(null);

    const handleUpload = async () => {
        if (!file) {
            toast.warn("Please select a file.");
            return;
        }
        try {
            await uploadFile(file, token);
            toast.success("File uploaded successfully!");
            setFile(null); // Reset file after successful upload
            setTimeout(() => {
                window.location.reload();
            }, 1000);
        } catch (error) {
            toast.error("File upload failed!");
            console.error(error);
        }
    };

    return (
        <Box sx={styles.container}>
            <Paper elevation={3} sx={styles.uploadBox}>
                <Typography variant="h5" sx={{ marginBottom: 2 }}>
                    📂 Upload Your File
                </Typography>

                {/* File Input */}
                <input
                    type="file"
                    onChange={(e) => setFile(e.target.files[0])}
                    style={styles.fileInput}
                />

                {/* Selected File Name */}
                {file && (
                    <Typography variant="body1" sx={styles.fileName}>
                        Selected: {file.name}
                    </Typography>
                )}

                {/* Upload Button */}
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<CloudUploadIcon />}
                    onClick={handleUpload}
                    sx={styles.uploadButton}
                >
                    Upload File
                </Button>
            </Paper>
        </Box>
    );
};

// Material UI Styles
const styles = {
    container: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "50vh",
        backgroundColor: "#f5f5f5",
    },
    uploadBox: {
        padding: "30px",
        textAlign: "center",
        borderRadius: "10px",
        backgroundColor: "#fff",
        width: "400px",
    },
    fileInput: {
        display: "block",
        margin: "10px auto",
        cursor: "pointer",
    },
    fileName: {
        margin: "10px 0",
        fontWeight: "bold",
    },
    uploadButton: {
        marginTop: "10px",
        width: "100%",
    },
};

export default FileUpload;
