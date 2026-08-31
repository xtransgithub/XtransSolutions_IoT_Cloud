import axios from "axios";
import config from "../../../config";
 //const API_BASE_URL = "https://cloud.xtranssolutions.com/ml";
 //const BACKEND_URL = "https://cloud.xtranssolutions.com/api";
//const API_BASE_URL = "http://74.208.151.248:5001";
// const BACKEND_URL = "http://127.0.0.1:4001";
//const BACKEND_URL = "http://74.208.151.248:4001";
// Run User Code
export const runCode = async (code, token) => {
    return axios.post(`${config.FLASK_URL}code/run`, { code }, {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    });
};

// List User Files
export const listFiles = async (token) => {
    return axios.get(`${config.FLASK_URL}file/list`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

// Upload File
export const uploadFile = async (file, token) => {
    const formData = new FormData();
    formData.append("file", file);
    return axios.post(`${config.FLASK_URL}file/upload`, formData, {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
        },
    });
};

// Delete File
export const deleteFile = async (filename, token) => {
    return axios.delete(`${config.FLASK_URL}file/delete`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        data: { filename },
    });
};

// Rename File
export const renameFile = async (oldName, newName, token) => {
    return axios.post(`${config.FLASK_URL}file/rename`, { old_filename: oldName, new_filename: newName }, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

// Fetch Channels
export const fetchChannels = async (token) => {
    return axios.get(`${config.BACKEND_URL}api/auth/channels`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

// Fetch CSV file for selected channel
export const fetchCSV = async (channelId,channelName, token) => {
    return axios.post(`${config.FLASK_URL}file/fetch`, { channel_id: channelId ,channel_name: channelName }, {
        headers: {
            Authorization: `Bearer ${token}`, // Not Bearer
        },
    });
};

export const trainModel = (code, token,modelName) => {
    return axios.post(
        `${config.FLASK_URL}model/train`,
        {
            code: code,
            model_name: modelName
        },
        {
            headers: {
                Authorization: token
            }
        }
    );
};


export const downloadModel = (filename, token) => {
    return axios.get(
        `${config.FLASK_URL}model/download/${encodeURIComponent(filename)}`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            },
            responseType: "blob"
        }
    );
};

export const listModels = (token) => {
    return axios.get(
        `${config.FLASK_URL}model/list`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );
    
};
export const deleteModel = (filename, token) => {
    return axios.delete(
        `${config.FLASK_URL}model/delete/${encodeURIComponent(filename)}`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );
};
// export const getChannelName = async (channelId, token) => {
//     return axios.get(
//         `${config.BACKEND_URL}api/auth/channel/${channelId}/name`,
//         {
//             headers: {
//                 Authorization: `Bearer ${token}`,
//             },
//         }
//     );
// };