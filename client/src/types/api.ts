/** Axios 설정 타입 확장 */
declare module "axios" {
  interface AxiosRequestConfig {
    metadata?: {
      startTime: number;
      endTime?: number;
    };
  }
}

/** transforms: 요청/응답 데이터 타입 */
export interface RequestData {
  [key: string]: unknown;
}

export interface ResponseData {
  [key: string]: unknown;
}
