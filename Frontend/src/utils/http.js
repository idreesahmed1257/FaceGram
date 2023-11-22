import axios from "axios";
import { NGROK_URL } from "../assets/variables";

export const privateAxiosInstance = axios.create({
  baseURL: NGROK_URL,
  headers: {
    Authorization: `Bearer ${localStorage.getItem("authToken")}`,
    "ngrok-skip-browser-warning": "69420",
  }
});

export const ngrokInstance = axios.create({
  baseURL: NGROK_URL,
  headers: {
    "ngrok-skip-browser-warning": "69420",
    "Access-Control-Allow-Origin": "*",
  }
});


export const publicAxiosInstance = axios.create({
  baseURL: NGROK_URL,
  headers: {
    "ngrok-skip-browser-warning": "69420",
    "Access-Control-Allow-Origin": "*", // allow CORS
  }
});
