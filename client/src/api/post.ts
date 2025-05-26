import axiosInstance from "@/lib/axios/axiosInstance";

const post = async (url: string, data: unknown): Promise => {
  const response = await axiosInstance.post(url, data);
  return response.data;
};

export default post;
