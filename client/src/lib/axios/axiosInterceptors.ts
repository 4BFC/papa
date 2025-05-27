import { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import axiosInstance from "./axiosInstance";
import {
  handleUnauthorized,
  handleForbiddenError,
  handleNotFoundError,
  handleServerError,
  handleNetworkError,
  handleLogout,
  refreshToken,
} from "./errorHandlers";
// import { transformRequestData, transformResponseData } from "./transformers";

axiosInstance.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    /**인증 토큰 추가 */
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    /**요청 시작 시간 기록 (성능 측정) */
    config.metadata = { startTime: new Date().getTime() };

    /**요청 데이터 변환: 현재는 불필요 */
    /**
    if (config.data) {
      config.data = transformRequestData(config.data);
    } 
    */

    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    /**응답 데이터 변환: 현재는 불필요 */
    /**
    if (response.data) {
      response.data = transformResponseData(response.data);
    }
    */

    /**성능 측정 */
    const endTime = new Date().getTime();
    const startTime = response.config.metadata?.startTime;
    if (startTime) {
      console.log(`요청 소요 시간: ${endTime - startTime}ms`);
    }
    return response;
  },
  (error: AxiosError) => {
    /** HTTP 상태 코드별 에러 처리 */
    if (error.response) {
      switch (error.response.status) {
        case 401:
          /** 인증 에러 처리 */
          handleUnauthorized();
          break;
        case 403:
          /** 권한 에러 처리 */
          handleForbiddenError();
          break;
        case 404:
          /** 리소스 없음 에러 처리 */
          handleNotFoundError();
          break;
        case 500:
          /** 서버 에러 처리 */
          handleServerError();
          break;
      }
    }
    /** 네트워크 에러 처리 */
    if (error.request) {
      handleNetworkError();
    }

    /** 토큰 만료 처리 */
    if (error.response?.status === 401 && error.config) {
      /**토큰 갱신 로직 */
      return refreshToken()
        .then((newToken) => {
          /** 토큰 갱신 후 요청 재시도 */
          if (error.config?.headers) {
            error.config.headers.Authorization = `Bearer ${newToken}`;
            return axiosInstance(error.config);
          }
          return Promise.reject(error);
        })
        .catch((refreshError: AxiosError) => {
          /** 토큰 갱신 실패 시 로그아웃 처리 */
          handleLogout();
          return Promise.reject(refreshError);
        });
    }

    return Promise.reject(error);
  }
);
