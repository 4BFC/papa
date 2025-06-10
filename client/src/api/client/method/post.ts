import { axiosInstance } from "@/api";

const post = async <ResponseType, BodyType>(
  url: string,
  body?: BodyType
): Promise<ResponseType> => {
  try {
    const response = await axiosInstance.post<ResponseType>(url, body);
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
  // undefined를 반환하지 않는 경우 에러 발생 또는 undeinfed를 명시적으로 반환하는 것이 좋음.
  throw new Error("post 함수에서 반환되지 않았습니다.");
};

export default post;
