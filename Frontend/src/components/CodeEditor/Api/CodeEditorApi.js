import axios from "axios";

const API_URL = "http://localhost:5000";

// Function to execute Python code
export const executeCode = async (code) => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      return { output: "", error: "User is not authenticated. Please log in." };
    }

    const response = await axios.post(
      `${API_URL}/code/run`,
      { code },
      { headers: { Authorization: token, "Content-Type": "application/json" } }
    );

    return response.data;
  } catch (error) {
    return {
      output: "",
      error: error.response?.data?.error || "Failed to execute code",
    };
  }
};

// Function to list files
export const listFiles = async () => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      return [];
    }

    const response = await axios.get(`${API_URL}/file/list`, {
      headers: { Authorization: token },
    });

    return response.data.files || [];
  } catch (error) {
    console.error("Error listing files:", error);
    return [];
  }
};

// Function to upload a file
export const uploadFile = async (file) => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      throw new Error("User not authenticated.");
    }

    const formData = new FormData();
    formData.append("file", file);

    await axios.post(`${API_URL}/file/upload`, formData, {
      headers: { Authorization: token, "Content-Type": "multipart/form-data" },
    });

    return { success: true };
  } catch (error) {
    console.error("Error uploading file:", error);
    return { success: false, error: "File upload failed." };
  }
};

// Function to delete a file
export const deleteFile = async (filename) => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      throw new Error("User not authenticated.");
    }

    await axios.delete(`${API_URL}/file/delete`, {
      headers: { Authorization: token, "Content-Type": "application/json" },
      data: { filename },
    });

    return { success: true };
  } catch (error) {
    console.error("Error deleting file:", error);
    return { success: false, error: "File deletion failed." };
  }
};
