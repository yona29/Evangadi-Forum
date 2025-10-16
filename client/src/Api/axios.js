import axios from "axios";
const instance = axios.create({
  baseURL: "http://localhost:14255/api",
  // baseURL: "https://forum-backend-2-ds91.onrender.com//api",
});
export default instance;
