import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import CodeMirror from '@uiw/react-codemirror';
import { python } from '@codemirror/lang-python';
import { oneDark } from '@codemirror/theme-one-dark';
import { runCode } from '../api/api';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CodeEditor = ({ token }) => {
    const [code, setCode] = useState('');
    const [output, setOutput] = useState('');
    const [plot, setPlot] = useState(null);

    const handleRunCode = async () => {
        try {
            const response = await runCode(code, token);
            setOutput(response.data.output);
            setPlot(response.data.plot);
            console.log(response.data.plot);
            toast.success("Code executed successfully!");
        } catch (error) {
            toast.error("Error executing code");
            console.error(error);
        }
    };

    return (
        <div style={styles.container}>
            <h2>Coding Playground</h2>
            
            {/* Code Editor */}
            <CodeMirror
                value={code}
                height="300px"
                extensions={[python()]}
                theme={oneDark}
                onChange={(value) => setCode(value)}
            />
            
            {/* Run Button */}
            <button style={styles.button} onClick={handleRunCode}>Run Code</button>

            {/* Output Box */}
            <div style={styles.outputContainer}>
                <h3>Output:</h3>
                <div style={styles.outputBox}>
                    <pre>{output || "No output yet..."}</pre>
                </div>
            </div>

            {/* Plot Output */}
            {plot && (
                <div style={styles.plotContainer}>
                    <h3>Plot Output:</h3>
                    <img src={`data:image/png;base64,${plot}`} alt="Plot Output" style={styles.plotImage} />
                </div>
            )}

            {/* File Management Button */}
            <div style={styles.fileButtonContainer}>
                <Link to="/files" style={styles.fileButton}>📂 File Management</Link>
            </div>
        </div>
    );
};

// Inline Styles
const styles = {
    container: {
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "10px",
    },
    button: {
        marginTop: "10px",
        padding: "10px 20px",
        backgroundColor: "#007BFF",
        color: "#FFF",
        border: "none",
        cursor: "pointer",
        borderRadius: "5px",
        fontSize: "16px",
    },
    outputContainer: {
        marginTop: "20px",
        textAlign: "left",
    },
    outputBox: {
        backgroundColor: "#1e1e1e",
        color: "#ffffff",
        padding: "10px",
        borderRadius: "5px",
        minHeight: "120px",
        border: "1px solid #444",
        overflowX: "auto",
    },
    plotContainer: {
        marginTop: "20px",
        textAlign: "center",
    },
    plotImage: {
        maxWidth: "100%",
        borderRadius: "5px",
        border: "1px solid #ddd",
    },
    fileButtonContainer: {
        marginTop: "30px",
        textAlign: "center",
    },
    fileButton: {
        display: "inline-block",
        padding: "12px 25px",
        backgroundColor: "#28a745",
        color: "#ffffff",
        textDecoration: "none",
        borderRadius: "5px",
        fontSize: "18px",
        fontWeight: "bold",
    },
};

export default CodeEditor;