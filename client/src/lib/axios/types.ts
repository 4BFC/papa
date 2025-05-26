/** Axios 설정 타입 확장 */
declare module "axios" {
  interface AxiosRequestConfig {
    metadata?: {
      startTime: number;
      endTime: number;
    };
  }
}

/** 요청/응답 데이터 타입 */
export interface RequestData {
  [key: string]: unknown;
}

export interface ResponseData {
  [key: string]: unknown;
}

/** 에러 핸들러 타입 */
export type ErrorHandler = () => void;
export type TokenRefresher = () => Promise<string>;
