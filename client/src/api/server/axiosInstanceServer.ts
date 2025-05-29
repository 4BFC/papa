import axios, { AxiosInstance } from "axios";

const axiosInstanceServer: AxiosInstance = axios.create({
  baseURL: `${process.env.MY_API}`,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.MY_ANON_KEY}`,
  },
});

export default axiosInstanceServer;
