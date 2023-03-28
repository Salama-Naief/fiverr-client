import axios from "axios";

export const axiosUrl = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URI,
  withCredentials: true,
});
