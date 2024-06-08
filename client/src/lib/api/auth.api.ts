import axios from 'axios';
import server from '$lib/api';

export async function register(email: string, password: string) {
  const response = await server.post('/auth/signup', { email, password });
  return response.data;
}

export async function login(email: string, password: string) {
  const response = await axios.post('/auth/login', { email, password });
  return response.data;
}

export async function getUser() {
  const response = await axios.get('/auth/user');
  return response.data;
}
