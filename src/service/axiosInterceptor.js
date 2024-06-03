// eslint-disable-next-line import/no-extraneous-dependencies
import axios from "axios";

import { BaseURL } from "src/config";

const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
  // "Access-Control-Allow-Origin": "*",
  // Add any other headers you need here
};
const AxiosAPI = axios.create({
  baseURL: BaseURL,
  headers,
});

AxiosAPI.interceptors.request.use(
  (config) => {
    // const source = CancelToken.source();

    // // Store the cancel token source in the request configuration
    // config.cancelToken = source.token;

    // // Store the cancel token source for this request
    // requestCancelTokenSources[config.url] = source;
    // Check if the request URL starts with "/api"
    if (config.url && config.url.startsWith("/api")) {
      // Add your authorization token to the request headers
      const token = localStorage.getItem("token");
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => 
    // Do something with request error
     Promise.reject(error)
  
);

AxiosAPI.interceptors.response.use(
  (response) => 
    // Do something with successful response data
     response
  ,
  (error) => {
    // if (isCancel(error)) {
    //   // Handle canceled request
    //   console.log("Request canceled:", error.message);
    // } else {
    //   // Handle other response errors
    // console.error("Error------", error.response.status);
    //! this code is for logging out for unauthorized request
    if (error.response.status === 403) {
      // console.log("logout-----");
      localStorage.clear();
      window.location.replace(`${window.location.origin  }/login`);
    }
    // }
    return Promise.reject(error);
  }
);

export const API = AxiosAPI;

// export const CancelAPI = function cancelRequest(url: string) {
//   if (requestCancelTokenSources[url]) {
//     requestCancelTokenSources[url].cancel(
//       "Request canceled due to user interaction"
//     );
//     // Remove the canceled request's cancel token source
//     delete requestCancelTokenSources[url];
//   }
// };
