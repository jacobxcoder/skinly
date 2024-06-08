import server from '$lib/api';

export interface User {
  id: string;
  email: string;
  phone?: string;
  updated_at?: Date;
  email_confirmed_at?: Date;
  created_at?: Date;
  last_sign_in_at?: Date;
}

export interface GetUserResponse {
  user: User;
}

export async function register(email: string, password: string) {
  const response = await server.post('/auth/register', { email, password });
  return response.data;
}

export async function login(email: string, password: string) {
  const response = await server.post('/auth/login', { email, password });
  return response.data;
}

export async function getUser() {
  const response = await server.get<GetUserResponse>('/auth/user');
  return response.data;
}
