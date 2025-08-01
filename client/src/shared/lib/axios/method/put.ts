import { axiosInstance } from "@/shared/lib/axios";

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
      throw new Error("알 수 없는 에러가 발생했습니다.");
    }
    throw new Error("put 함수에서 반환되지 않았습니다.");
  }
};

export default put;
