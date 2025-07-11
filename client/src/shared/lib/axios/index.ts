/**client */
export { default as post } from "./method/post";
export { default as put } from "./method/put";
export { default as get } from "./method/get";
/**axiosconfig */
export { default as axiosInstance } from "./axiosInstance";
// export { default as axiosInterceptors } from "./client/axiosInterceptors";
/**api utils */
export * from "./errorHandlers";
export * from "./transformers";

/**server */
export { default as axiosInstanceServer } from "./axiosInstanceServer";
