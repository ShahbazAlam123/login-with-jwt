import axios from "axios";

const instance = axios.create({
  // baseURL: "http://localhost:8000/api",
  baseURL: process.env.REACT_APP_API_URL,
});

instance.defaults.headers.common["Authorization"] = sessionStorage.Newtoken;

export default instance;
