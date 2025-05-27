import { axiosInstance } from "@/lib";

const get = async <T>(url: string): Promise<T> => {
  try {
    const response = await axiosInstance.get<T>(url);
    return response.data;
  } catch (error: unknown) {
    console.error(error);
  }
};

export default get;
