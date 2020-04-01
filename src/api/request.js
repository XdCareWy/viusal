import axios from "axios";

let isDev;
let url = "//jupiter.jd.com";

if (process.env.NODE_ENV === "development") {
  isDev = true;
  url = "";
} else if (process.env.NODE_ENV === "production") {
  isDev = false;
  url = "//jupiter.jd.com";
}
console.log(isDev); // eslint-disable-line
// url: 线上- ""; 预发：yf_yrl; mock: mock_url;
axios.defaults.baseURL = url;
axios.defaults.timeout = 500000;
axios.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded";

export const postApi = (url, params) => {
  return axios.post(url, params, { withCredentials: true }).then(data => data);
};
export const getApi = (url, params) => {
  return axios
    .get(url, { params: params, withCredentials: true })
    .then(data => data);
};
// Interceptors
// request interceptor
axios.interceptors.request.use(
  function(config) {
    return config;
  },
  function(error) {
    return Promise.reject(error);
  }
);

// response interceptor
axios.interceptors.response.use(
  function(response) {
    const { status, data } = response;
    if (status === 200) {
      return data;
    } else {
      // todo: 处理其他的状态码
      console.log(response);
      return [];
    }
  },
  function(error) {
    return Promise.reject(error);
  }
);
