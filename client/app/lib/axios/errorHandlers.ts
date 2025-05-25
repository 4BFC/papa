import { ErrorHandler, TokenRefresher } from "./types";

export const handleUnauthorized: ErrorHandler = () => {
  // 인증 에러 처리 로직
};

export const handleForbiddenError: ErrorHandler = () => {
  // 권한 에러 처리 로직
};

export const handleNotFoundError: ErrorHandler = () => {
  // 404 에러 처리 로직
};

export const handleServerError: ErrorHandler = () => {
  // 서버 에러 처리 로직
};

export const handleNetworkError: ErrorHandler = () => {
  // 네트워크 에러 처리 로직
};

export const handleLogout: ErrorHandler = () => {
  // 로그아웃 처리 로직
};

export const refreshToken: TokenRefresher = async () => {
  // 토큰 갱신 로직
  return "";
};
