import axios, { AxiosInstance } from "axios";

// Create an Axios instance
const apiClient: AxiosInstance = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL, // Replace with your API base URL
  headers: {
    "Content-Type": "application/json", // Optional: Set content type if needed
  },
});

// Function to set the authentication token
export const setAuthToken = (token: string | null): void => {
  if (token) {
    apiClient.defaults.headers["Authorization"] = `Bearer ${token}`;
  } else {
    delete apiClient.defaults.headers["Authorization"];
  }
};

export default apiClient;
