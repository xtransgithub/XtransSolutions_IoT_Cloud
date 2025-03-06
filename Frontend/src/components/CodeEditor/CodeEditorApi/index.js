import axios from "axios";

const API_URL = "http://localhost:5000";

export const executeCode = async (code) => {
  try {
    const response = await axios.post(`${API_URL}/execute`, { code });
    return response.data;
  } catch (error) {
    return {
      text: "",
      error: error.response?.data?.error || "Failed to execute code",
    };
  }
};
