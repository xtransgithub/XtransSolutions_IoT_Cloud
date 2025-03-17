import React, { useState, useEffect } from "react";
import { listFiles, deleteFile, uploadFile, runCode } from "./api/api";
import { toast } from "react-toastify";
import CodeMirror from "@uiw/react-codemirror";
import { python } from "@codemirror/lang-python";
import { vscodeLight } from "@uiw/codemirror-theme-vscode";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import {
    Box,
    Button,
    Typography,
    Paper,
    IconButton,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import DeleteIcon from "@mui/icons-material/Delete";

const CodePlayground = ({ token }) => {
    const [code, setCode] = useState("");
    const [output, setOutput] = useState("");
    const [files, setFiles] = useState([]);
    const [file, setFile] = useState(null);

    useEffect(() => {
        fetchFiles();
    }, []);

    const fetchFiles = async () => {
        try {
            const response = await listFiles(token);
            setFiles(response.data.files[0].files);
        } catch (error) {
            toast.error("Failed to fetch files.");
        }
    };

    const handleRunCode = async () => {
        try {
            const response = await runCode(code, token);
            setOutput(response.data.output);
            toast.success("Code executed successfully!");
        } catch (error) {
            toast.error("Error executing code");
        }
    };

    const handleUpload = async () => {
        if (!file) {
            toast.warn("Please select a file.");
            return;
        }
        try {
            await uploadFile(file, token);
            toast.success("File uploaded successfully!");
            setFile(null);
            fetchFiles();
        } catch (error) {
            toast.error("File upload failed!");
        }
    };

    const handleDelete = async (filename) => {
        try {
            const response = await deleteFile(filename, token);
            
            if (response.data.status === "success") {
                toast.success(response.data.message || "File deleted successfully!");
                fetchFiles(); // Fetch updated file list after deletion
            } else {
                toast.error(response.data.message || "Failed to delete file.");
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Error deleting file.");
        }
    };     

    // Light Theme
    const theme = createTheme({
        palette: {
            mode: "light",
        },
    });
    
    return (
        <ThemeProvider theme={theme}>
            <Box sx={styles.container}>
                
                {/* Sidebar - File Explorer */}
                <Box sx={styles.sidebar}>
                    <Typography variant="h6">FILE EXPLORER</Typography>

                    {/* Smaller Upload Box */}
                    <Paper elevation={3} sx={styles.uploadBox}>
                        <input type="file" onChange={(e) => setFile(e.target.files[0])} style={styles.fileInput} />
                        <Button variant="contained" color="primary" startIcon={<CloudUploadIcon />} onClick={handleUpload} fullWidth>
                            Upload
                        </Button>
                    </Paper>

                    <Paper elevation={3} sx={styles.fileList}>
                    <ul style={styles.fileListUl}>
                        {files.map((file, index) => (
                            <li key={index} style={styles.fileItem} title={file}>
                                <IconButton size="small" color="error" onClick={() => handleDelete(file)}>
                                    <DeleteIcon />
                                </IconButton>
                                <span style={styles.fileName}>{file}</span>
                            </li>
                        ))}
                    </ul>
                    </Paper>
                </Box>

                {/* Main Editor Section */}
                <Box sx={styles.editorContainer}>
                    <Box sx={styles.topBar}>
                        <Button variant="contained" color="success" startIcon={<PlayArrowIcon />} onClick={handleRunCode}>
                            Run
                        </Button>
                    </Box>

                    <CodeMirror
                        value={code}
                        height="395px"
                        extensions={[python()]}
                        theme={vscodeLight}
                        onChange={(value) => setCode(value)}
                        style={{ flexGrow: 1 }}
                    />
                </Box>

                {/* Terminal - Adjusted for Proper UI Fit */}
                <Box sx={styles.terminal}>
                    <Typography variant="h6" sx={{ marginBottom: "5px" }}>Terminal</Typography>
                    <Paper elevation={3} sx={styles.outputBox}>
                        <pre>{output || "No output yet..."}</pre>
                    </Paper>
                </Box>
            </Box>
        </ThemeProvider>
    );
};

// Styles
const styles = {
    container: {
        display: "grid",
        gridTemplateColumns: "280px 4fr",
        gridTemplateRows: "70% 30%",
        gridTemplateAreas: `
            "sidebar editor"
            "sidebar terminal"
        `,
        height: "88vh",
        backgroundColor: "#f5f5f5",
    },
    sidebar: {
        gridArea: "sidebar",
        display: "flex",
        flexDirection: "column",
        padding: "10px",
        backgroundColor: "#ffffff",
    },
    uploadBox: {
        padding: "6px",
        borderRadius: "5px",
        marginBottom: "8px",
        width: "95%",
        alignSelf: "center",
    },
    fileInput: {
        display: "block",
        marginBottom: "6px",
    },
    fileList: {
        padding: "10px",
        borderRadius: "5px",
        flexGrow: 1,
    },
    fileListUl: {
        listStyle: "none",
        padding: 0,
    },
    fileItem: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "5px 0",
    },
    editorContainer: {
        gridArea: "editor",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#ffffff",
    },
    topBar: {
        padding: "8px",
        display: "flex",
        justifyContent: "flex-start",
        backgroundColor: "#e0e0e0",
    },
    terminal: {
        gridArea: "terminal",
        padding: "10px",
        borderTop: "2px solid #ccc",
        backgroundColor: "#ffffff",
        overflow: "hidden",
    },
    outputBox: {
        padding: "6px",
        borderRadius: "5px",
        minHeight: "100px",
        overflowX: "auto",
        whiteSpace: "pre-wrap",
        backgroundColor: "#e0e0e0",
    },
    fileItem: {
        display: "flex",
        alignItems: "center",
        padding: "3px 0",
        fontSize: "12px",
        maxWidth: "250px",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
        gap: "5px",
    },
    fileName: {
        flexGrow: 1,
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
    },   
};

export default CodePlayground;
