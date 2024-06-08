import server from '$lib/api';
import { type User } from '@supabase/supabase-js';

export type { User };

interface GetUserResponse {
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

export async function logout() {
  const response = await server.post('/auth/logout');
  return response.data;
}
