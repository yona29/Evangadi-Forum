import axios from "axios";

const instance = axios.create({
  baseURL: "https://evangadi-forum-7n4z.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default instance;
