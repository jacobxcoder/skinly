import { createClient } from '@supabase/supabase-js';
import env from '@/env';

export const supabase = createClient(env.SUPABASE_URL, env.SUPABASE_KEY);

export default supabase;

// not sure where and how to use it yet
export async function refreshToken() {
  const { data, error } = await supabase.auth.refreshSession();

  if (error) {
    throw error;
  }

  return data;
}
