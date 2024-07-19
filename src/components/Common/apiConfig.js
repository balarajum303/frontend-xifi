import axios from "axios"
// https://2943-223-178-84-212.ngrok-free.app
export const API_BASE_URL = "http://localhost:3000"
export const CATEGORY_API = {
  GET_DASHBOARD:"/dashboard",
  GET_USER_PROFILE:"/user-profile",
  POST_FILE_UPLOAD:"/upload",
  UPDATE_FILE_UPLOAD:"/update-user-profile",
  GET_CATEGORY:"/category",
  POST_CATEGORY:"/category",
  UPDATE_CATEGORY:"/category",
  STATUS_UPDATE_CATEGORY:"/category-status-update",
  GET_USERS:"/users",
  POST_USERS:"/users",
  GET_USER_CATEGORY:"/user-category",
  STATUS_UPDATE_USER_CATEGORY:"/user-category-status-update",
  GET_PAYMENT_CATEGORY:"/payment-category",
  STATUS_UPDATE_PAYMENT_CATEGORY:"/payment-category-status-update"

 

}
export function getToken() {
  return `Bearer ${localStorage.getItem("token")}`
}
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Authorization: getToken(),
    "Content-Type": "application/json",
  },
})
api.interceptors.request.use(config => {
  const token = getToken()
  if (token) {
    config.headers.Authorization = token
  }
  return config
})

export default api
