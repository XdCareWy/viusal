import { postApi } from "./request";

export const getData = (params = {}) =>
  postApi("/plusTopological/queryList", params);
