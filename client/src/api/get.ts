import axiosInstance from "@/lib/axios/axiosInstance";

const get = async <T>(url: string): Promise<T> => {
  const response = await axiosInstance.get<T>(url);
  return response.data;
};

export default get;
