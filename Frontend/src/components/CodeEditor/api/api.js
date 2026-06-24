import axios from "axios";

 const API_BASE_URL = "https://cloud.xtranssolutions.com/ml";
 const BACKEND_URL = "https://cloud.xtranssolutions.com/api";
//const API_BASE_URL = "http://74.208.151.248:5001";
// const BACKEND_URL = "http://127.0.0.1:4001";
//const BACKEND_URL = "http://74.208.151.248:4001";
// Run User Code
export const runCode = async (code, token) => {
    return axios.post(`${API_BASE_URL}/code/run`, { code }, {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    });
};

// List User Files
export const listFiles = async (token) => {
    return axios.get(`${API_BASE_URL}/file/list`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

// Upload File
export const uploadFile = async (file, token) => {
    const formData = new FormData();
    formData.append("file", file);
    return axios.post(`${API_BASE_URL}/file/upload`, formData, {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
        },
    });
};

// Delete File
export const deleteFile = async (filename, token) => {
    return axios.delete(`${API_BASE_URL}/file/delete`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        data: { filename },
    });
};

// Rename File
export const renameFile = async (oldName, newName, token) => {
    return axios.post(`${API_BASE_URL}/file/rename`, { old_filename: oldName, new_filename: newName }, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

// Fetch Channels
export const fetchChannels = async (token) => {
    return axios.get(`${BACKEND_URL}/api/auth/channels`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

// Fetch CSV file for selected channel
export const fetchCSV = async (channelId, token) => {
    return axios.post(`${API_BASE_URL}/file/fetch`, { channel_id: channelId }, {
        headers: {
            Authorization: `Bearer ${token}`, // Not Bearer
        },
    });
};
