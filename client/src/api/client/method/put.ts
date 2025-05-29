import { axiosInstance } from "@/api";

const put = async <T>(url: string, body: T): Promise<T> => {
  try {
    const response = await axiosInstance.put<T>(url, body);
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

export default put;
