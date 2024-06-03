import axios from "axios"
export const API_BASE_URL = "http://localhost:3000"
export const CATEGORY_API = {
  GET_CATEGORY:"/category",
  POST_CATEGORY:"/category",
  UPDATE_CATEGORY:"/category",
  STATUS_UPDATE_CATEGORY:"/category-status-update"

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
