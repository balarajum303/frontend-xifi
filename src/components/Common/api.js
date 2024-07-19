import axios from 'axios';
// publi ip:http://182.71.48.116:8585/KP/#/
// Login:http://192.168.8.107:8585/MccAdmin/authenticate
// https://2943-223-178-84-212.ngrok-free.app
const api = axios.create({
    baseURL: 'http://localhost:3000',   
    headers: {
      'Authorization': `Bearer ${localStorage.getItem("token")}`,
      'Content-Type': 'application/json',
      "ngrok-skip-browser-warning": "69420"
    },
  });
  
  export default api; 