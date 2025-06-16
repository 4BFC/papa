import { RequestData, ResponseData } from "@/types";
/** 요청으로 부터 받은 데이터 형태 변화 함수 */
export const transformRequestData = (data: RequestData): RequestData => {
  // console.log("check data", data);
  //배열인 경우 재귀적으로 호출
  if (Array.isArray(data)) {
    // console.log("check data is array!!", data);
    return data.map((item) => {
      // console.log("check item", data);
      return transformRequestData(item);
    });
  }
  // 요청 데이터 변환 로직
  const snakeCaseData: RequestData = {};
  // 예외처리가 매우 필요하다.
  for (const key in data) {
    // console.log("check key", key);
    if (Object.prototype.hasOwnProperty.call(data, key)) {
      const snakeKey = key.replace(/([A-Z])/g, "_$1").toLowerCase();
      snakeCaseData[snakeKey] = data[key];
    }
  }
  // console.log("check snakeCaseData", JSON.stringify(snakeCaseData, null, 2));
  return snakeCaseData;
};

export const transformResponseData = (response: {
  data: ResponseData | ResponseData[];
  error: unknown;
}): { data: ResponseData | ResponseData[]; error: unknown } => {
  console.log("check response", response);
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
