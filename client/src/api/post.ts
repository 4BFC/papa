import { axiosInstance } from "@/lib";

const post = async <T>(url: string, body: unknown): Promise<T> => {
  try {
    const response = await axiosInstance.post<T>(url, body);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export default post;
