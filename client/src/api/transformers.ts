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

export const transformResponseData = (response: {
  data: ResponseData | ResponseData[];
  error: unknown;
}): { data: ResponseData | ResponseData[]; error: unknown } => {
  // 응답 데이터 변환 로직
  if (!response.data) return response;

  // 배열인 경우 각 요소를 변환
  if (Array.isArray(response.data)) {
    const transformedData = response.data.map((item) => {
      const pascalCaseData: ResponseData = {};
      for (const key in item) {
        if (Object.prototype.hasOwnProperty.call(item, key)) {
          const pascalKey = key
            .split("_")
            .map((word, index) =>
              index === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1)
            )
            .join("");
          pascalCaseData[pascalKey] = item[key];
        }
      }
      return pascalCaseData;
    });
    return { ...response, data: transformedData };
  }

  // 단일 객체인 경우 변환
  const pascalCaseData: ResponseData = {};
  for (const key in response.data) {
    if (Object.prototype.hasOwnProperty.call(response.data, key)) {
      const pascalKey = key
        .split("_")
        .map((word, index) =>
          index === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1)
        )
        .join("");
      pascalCaseData[pascalKey] = response.data[key];
    }
  }
  console.log("check pascalCaseData", pascalCaseData);
  return { ...response, data: pascalCaseData };
};
