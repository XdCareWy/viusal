import { postApi } from "./request";

export const getData = (params = {}) =>
  postApi("/plusTopological/queryList", params);
export const getErrorData = (params = {}) =>
  postApi("/plusTopological/queryError", params);
