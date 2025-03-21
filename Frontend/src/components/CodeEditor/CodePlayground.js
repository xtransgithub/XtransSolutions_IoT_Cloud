import React, { useState, useEffect } from "react";
import { listFiles, deleteFile, uploadFile, runCode, renameFile } from "./api/api";
import { toast } from "react-toastify";
import CodeMirror from "@uiw/react-codemirror";
import { python } from "@codemirror/lang-python";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import {
    Box,
    Button,
    Typography,
    Paper,
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import FolderIcon from "@mui/icons-material/Folder";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";

const CodePlayground = ({ token }) => {
    const [code, setCode] = useState("");
    const [output, setOutput] = useState("");
    const [isPopupOpen, setPopupOpen] = useState(false);
    const [files, setFiles] = useState([]);
    const [file, setFile] = useState(null);
    const [renameDialogOpen, setRenameDialogOpen] = useState(false);
    const [selectedFile, setSelectedFile] = useState("");
    const [newFileName, setNewFileName] = useState("");
    const [isRunning, setIsRunning] = useState(false);

    useEffect(() => {
        fetchFiles();
    }, []);

    const fetchFiles = async () => {
        try {
            const response = await listFiles(token);
            setFiles(response.data.files || []);
        } catch (error) {
            toast.error("Failed to fetch files.");
        }
    };

    const handleRunCode = async () => {
        setIsRunning(true);
        try {
            const response = await runCode(code, token);
            setOutput(response.data.output);
            toast.success("Code executed successfully!");
        } catch (error) {
            const errorMessage = error.response?.data?.error || "Unknown error occurred.";
        setOutput(`Error: ${errorMessage}`);
            toast.error("Error executing code");
        } finally {
            setIsRunning(false);
        }
    };

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
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
            await deleteFile(filename, token);
            toast.success("File deleted successfully!");
            fetchFiles();
        } catch (error) {
            toast.error("Error deleting file.");
        }
    };
    
    const handleRenameClick = (filename) => {
        setSelectedFile(filename);
        setNewFileName(filename);
        setRenameDialogOpen(true);
    };

    const handleRenameConfirm = async () => {
        if (!newFileName.trim() || newFileName === selectedFile) {
            toast.warn("Please enter a new filename.");
            return;
        }
        try {
            await renameFile(selectedFile, newFileName, token);
            toast.success("File renamed successfully!");
            setRenameDialogOpen(false);
            fetchFiles();
        } catch (error) {
            toast.error("Error renaming file.");
        }
    };

    return (
        <Box sx={styles.container}>
            {/* Sidebar - File Explorer */}
            <Box sx={styles.sidebar}>
                <Typography variant="h6" sx={styles.sidebarTitle}>
                    <FolderIcon sx={{ mr: 1 }} />
                    File Explorer
                </Typography>

                {/* Upload Box */}
                <Paper elevation={3} sx={styles.uploadBox}>
                    <input type="file" id="file-input" style={{ display: "none" }} onChange={handleFileChange} />
                    <Button variant="outlined" component="label" fullWidth sx={{ mb: 1 }}>
                        Select File
                        <input type="file" hidden onChange={handleFileChange} />
                    </Button>
                    <Typography sx={{ fontSize: "12px", textAlign: "center", color: "gray" }}>
                        {file ? file.name : "No file selected"}
                    </Typography>
                    <Button variant="contained" color="primary" startIcon={<CloudUploadIcon />} onClick={handleUpload} fullWidth sx={{ mt: 1 }} disabled={!file}>
                        Upload
                    </Button>
                </Paper>

                {/* File List */}
                <Paper elevation={3} sx={styles.fileList}>
                    {files.length === 0 ? (
                        <Typography sx={{ textAlign: "center", color: "gray" }}>No files available</Typography>
                    ) : (
                        files.map((file, index) => (
                            <Box key={index} sx={styles.fileItem}>
                                <InsertDriveFileIcon sx={{ color: "gray", fontSize: 18, mr: 1 }} />
                                <span style={styles.fileName}>{file}</span>

                                <IconButton size="small" color="primary" onClick={() => handleRenameClick(file)}>
                                    <EditIcon />
                                </IconButton>

                                <IconButton size="small" color="error" onClick={() => handleDelete(file)}>
                                    <DeleteIcon />
                                </IconButton>
                            </Box>
                        ))
                    )}
                </Paper>
            </Box>

            {/* Rename Dialog */}
            <Dialog open={renameDialogOpen} onClose={() => setRenameDialogOpen(false)}>
                <DialogTitle>Rename File</DialogTitle>
                <DialogContent>
                    <TextField fullWidth label="New Filename" value={newFileName} onChange={(e) => setNewFileName(e.target.value)} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setRenameDialogOpen(false)} color="secondary">Cancel</Button>
                    <Button onClick={handleRenameConfirm} color="primary">Rename</Button>
                </DialogActions>
            </Dialog>

            {/* Code Editor */}
            <Box sx={styles.editorContainer}>
                <Box sx={styles.topBar}>
                    <Button variant="contained" color="success" startIcon={<PlayArrowIcon />} onClick={handleRunCode} disabled={isRunning}>
                        {isRunning ? "Executing..." : "Run Code"}
                    </Button>
                </Box>
                <CodeMirror
                    value={code}
                    height="400px"
                    extensions={[python()]}
                    theme={vscodeDark}
                    onChange={(value) => setCode(value)}
                    style={{ flexGrow: 1, borderRadius: "5px", overflow: "hidden" }}
                />
            </Box>

            {/* Output Terminal */}
            <Box sx={styles.terminal}>
                <Typography variant="h6" sx={{ marginBottom: "5px" }}>Output</Typography>
                
                <Paper elevation={3} sx={styles.outputBox}>
                    <pre style={styles.outputText}>{output || "No output yet..."}</pre>
                </Paper>

                {output.length > 200 && (
                    <Button variant="outlined" color="primary" onClick={() => setPopupOpen(true)} sx={styles.viewFullOutput}>
                        View Full Output
                    </Button>
                )}
            </Box>

            {/* Popup for Large Output */}
            <Dialog open={isPopupOpen} onClose={() => setPopupOpen(false)} maxWidth="md" fullWidth>
                <DialogTitle>Full Output</DialogTitle>
                <DialogContent>
                    <pre style={{ whiteSpace: "pre-wrap", wordWrap: "break-word" }}>{output}</pre>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setPopupOpen(false)} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

// Styles
const styles = {
    container: {
        display: "grid",
        gridTemplateColumns: "260px 4fr",
        gridTemplateRows: "60% 40%",
        gridTemplateAreas: `
            "sidebar editor"
            "sidebar terminal"
        `,
        height: "90vh",
        backgroundColor: "#f5f5f5",
    },
    sidebar: {
        gridArea: "sidebar",
        display: "flex",
        flexDirection: "column",
        padding: "10px",
        backgroundColor: "#ffffff",
        borderRight: "1px solid #ddd",
    },
    sidebarTitle: {
        display: "flex",
        alignItems: "center",
        marginBottom: "10px",
    },
    uploadBox: {
        padding: "10px",
        borderRadius: "5px",
        marginBottom: "8px",
        width: "95%",
        alignSelf: "center",
        backgroundColor: "#f9f9f9",
    },
    fileList: {
        padding: "10px",
        borderRadius: "5px",
        flexGrow: 1,
        backgroundColor: "#fafafa",
        maxHeight: "250px",
        overflowY: "auto",
    },
    fileItem: {
        display: "flex",
        alignItems: "center",
        padding: "5px",
        fontSize: "14px",
        gap: "8px",
        borderBottom: "1px solid #eee",
    },
    fileName: {
        flexGrow: 1,
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
    },
    terminal: {
        gridArea: "terminal",
        padding: "10px",
        backgroundColor: "#ffffff",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "stretch",
    },
    outputBox: {
        padding: "10px",
        borderRadius: "5px",
        minHeight: "150px",
        maxHeight: "300px",
        overflowY: "auto",
        whiteSpace: "pre-wrap",
        backgroundColor: "#333",
        color: "#fff",
        fontSize: "14px",
        fontFamily: "monospace",
    },
    outputText: {
        margin: "0",
        whiteSpace: "pre-wrap",
        wordWrap: "break-word",
    },
    viewFullOutput: {
        marginTop: "10px",
        alignSelf: "center",
    },
};

export default CodePlayground;
