import { axiosInstance } from "@/lib";

const get = async <T>(url: string): Promise<T> => {
  try {
    const response = await axiosInstance.get<T>(url);
    return response.data;
  } catch (error: unknown) {
    /**타입 가드 설정 */
    if (error instanceof Error) {
      console.error(error);
    } else {
      console.error("예외 타입 Error", String(error));
    }
  }
};

export default get;
