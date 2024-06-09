import axios from 'axios';
import {
  PUBLIC_BACKEND_URL,
  PUBLIC_SUPABASE_URL,
  PUBLIC_SUPABASE_KEY
} from '$env/static/public';
import { createClient } from '@supabase/supabase-js';
import type { Database } from '$lib/api/database';

export const api = axios.create({
  baseURL: PUBLIC_BACKEND_URL,
  withCredentials: true
});

export default api;

export const supabase = createClient<Database>(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_KEY);

export type { Database };