import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000';
// const API_BASE_URL = 'http://cloud.xtranssolutions.com/tem/';

export const runCode = async (code, token) => {
    return axios.post(`${API_BASE_URL}/code/run`, { code }, {
        headers: { Authorization: `Bearer ${token}` }
    });
};

export const uploadFile = async (file, token) => {
    const formData = new FormData();
    formData.append('file', file);

    return axios.post(`${API_BASE_URL}/file/upload`, formData, {
        headers: { Authorization: `Bearer ${token}` }
    });
};

export const listFiles = async (token) => {
    return axios.get(`${API_BASE_URL}/file/list`, {
        headers: { Authorization: `Bearer ${token}` }
    });
};

export const deleteFile = async (filename, token) => {
    return axios.delete(`${API_BASE_URL}/file/delete`, {
        headers: { Authorization: `Bearer ${token}` },
        data: { filename }
    });
};
