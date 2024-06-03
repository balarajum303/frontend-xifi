const API_DEV_URL = "http://192.168.30.240:1996";
// const API_DEV_URL = "http://103.191.170.53:9091";

const API_PROD_URL = "http://103.191.170.53:9091";

let baseURL = "";
if (process.env.NODE_ENV === "development") {
  baseURL = API_DEV_URL;
} else if (process.env.NODE_ENV === "production") {
  baseURL = API_PROD_URL;
  console.log = () => {};
  console.debug = () => {};
  console.info = () => {};
  // console.warn = () => {};
  // console.error = () => {};
} else {
  console.error("Unknown environment mode");
}

export const BaseURL = baseURL;
