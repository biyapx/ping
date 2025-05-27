import axios from "axios";

export const axiosInstance = axios.create({
  baseURL:
    import.meta.env.MODE === "development"
      ? "http://localhost:5001"
      : "https://ping-xyw7.onrender.com/",
  withCredentials: true,
});
