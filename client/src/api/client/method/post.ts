import { axiosInstance } from "@/api";

const post = async <T>(url: string, body: T): Promise<T | undefined> => {
  try {
    const response = await axiosInstance.post<T>(url, body);
    return response.data;
  } catch (error: unknown) {
    /**타입 가드 설정 */
    if (error instanceof Error) {
      console.error(error);
    } else {
      console.error("예외 타입 Error", String(error));
      throw new Error("알 수 없는 에러가 발생했습니다.");
    }
  }
};

export default post;
