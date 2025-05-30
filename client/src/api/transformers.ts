import { RequestData, ResponseData } from "@/types";
/** 요청으로 부터 받은 데이터 형태 변화 함수 */
export const transformRequestData = (data: RequestData): RequestData => {
  // 요청 데이터 변환 로직
  const snakeCaseData: RequestData = {};
  for (const key in data) {
    console.log("check key", key);
    if (Object.prototype.hasOwnProperty.call(data, key)) {
      const snakeKey = key.replace(/([A-Z])/g, "_$1").toLowerCase();
      snakeCaseData[snakeKey] = data[key];
    }
  }
  console.log("check snakeCaseData", snakeCaseData);
  return snakeCaseData;
};

export const transformResponseData = (data: ResponseData): ResponseData => {
  // 응답 데이터 변환 로직
  return data;
};
