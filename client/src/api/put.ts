import { axiosInstance } from "@/lib";

const put = async <T>(url: string, body: unknown): Promise<T> => {
  try {
    const response = await axiosInstance.put<T>(url, body);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export default put;
