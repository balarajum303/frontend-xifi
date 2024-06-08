import axios from "axios"

export const API_BASE_URL = "http://localhost:3000"
export const CATEGORY_API = {
  GET_USER_PROFILE:"/user-profile",
  POST_FILE_UPLOAD:"/upload",
  UPDATE_FILE_UPLOAD:"/update-user-profile",
  GET_CATEGORY:"/category",
  POST_CATEGORY:"/category",
  UPDATE_CATEGORY:"/category",
  STATUS_UPDATE_CATEGORY:"/category-status-update",
  GET_USERS:"/users",
  POST_USERS:"/users",
 

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
