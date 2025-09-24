import axios from "axios";

const api = axios.create({
  baseURL: "https://localhost:7200/api",
  withCredentials: true, // Send cookies automatically
});


export default api;
// api.interceptors.response.use(
//   (res) => res, // Pass through successful responses without logging
//   (err) => {
//     console.error("Axios Response error:", err.message); // Log only errors
//     return Promise.reject(err);
//   }
// );