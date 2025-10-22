import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:14255/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default instance;
