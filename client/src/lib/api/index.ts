import axios from 'axios';
import { PUBLIC_BACKEND_URL } from '$env/static/public';

export const api = axios.create({
  baseURL: PUBLIC_BACKEND_URL,
  withCredentials: true
});

export default api;
