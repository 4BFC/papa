import { ErrorHandler, TokenRefresher } from "@/shared/types";

export const handleUnauthorized: ErrorHandler = () => {
  // 인증 에러 처리 로직
  localStorage.removeItem("token");
};

export const handleForbiddenError: ErrorHandler = () => {
  // 권한 에러 처리 로직
  alert("권한이 없습니다.");
};

export const handleNotFoundError: ErrorHandler = () => {
  // 404 에러 처리 로직
  window.location.href = "/404";
};

export const handleServerError: ErrorHandler = () => {
  // 서버 에러 처리 로직
  alert("서버 에러가 발생 했습니다. 잠시 후 다시 시도해주세요.");
};

export const handleNetworkError: ErrorHandler = () => {
  // 네트워크 에러 처리 로직
  alert("네트워크 에러가 발생 했습니다. 잠시 후 다시 시도해주세요.");
};

export const handleLogout: ErrorHandler = () => {
  // 로그아웃 처리 로직
  localStorage.removeItem("token");
};

export const refreshToken: TokenRefresher = async () => {
  // 토큰 갱신 로직
  alert("로그인 페이지로 이동합니다.");
  // window.location.href = "/login";
  return "";
};
