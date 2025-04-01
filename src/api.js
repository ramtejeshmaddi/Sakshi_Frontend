import axios from 'axios';

const API = axios.create({
  baseURL: "https://sakshi-backend-production.up.railway.app",  // ✅ Your deployed backend URL
});

export default API;
