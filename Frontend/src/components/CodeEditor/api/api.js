import axios from "axios";

const API_BASE_URL = "http://cloud.xtranssolutions.com/tem"; // Change if deployed

// Run User Code
export const runCode = async (code, token) => {
    return axios.post(`${API_BASE_URL}/code/run`, { code }, {
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    });
};

// List User Files
export const listFiles = async (token) => {
    return axios.get(`${API_BASE_URL}/file/list`, {
        headers: { Authorization: `Bearer ${token}` },
    });
};

// Upload a File
export const uploadFile = async (file, token) => {
    const formData = new FormData();
    formData.append("file", file);

    return axios.post(`${API_BASE_URL}/file/upload`, formData, {
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" },
    });
};

// Delete a File
export const deleteFile = async (filename, token) => {
    return axios.delete(`${API_BASE_URL}/file/delete`, {
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        data: { filename },
    });
};

export const renameFile = async (oldFilename, newFilename, token) => {
    return axios.post(`${API_BASE_URL}file/rename`, 
        { old_filename: oldFilename, new_filename: newFilename },
        {
            headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json"},
        }
    );
};