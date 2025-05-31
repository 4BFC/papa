/**client */
export { default as post } from "./client/method/post";
export { default as put } from "./client/method/put";
export { default as get } from "./client/method/get";
/**axiosconfig */
export { default as axiosInstance } from "./client/axiosInstance";
// export { default as axiosInterceptors } from "./client/axiosInterceptors";
/**api utils */
export * from "./errorHandlers";
export * from "./transformers";

/**server */
export { default as axiosInstanceServer } from "./server/axiosInstanceServer";
