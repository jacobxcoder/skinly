import { supabase } from '@/integrations/supabase';

export async function register(email: string, password: string) {
  const {
    data: { user },
    error
  } = await supabase.auth.signUp({
    email,
    password
  });

  if (error) {
    throw error;
  }

  return user;
}

export async function login(email: string, password: string) {
  const {
    data: { session },
    error
  } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (error) {
    throw error;
  }

  return session;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();

  if (error) {
    throw error;
  }
}

export async function getUser(token: string) {
  const { data: user, error } = await supabase.auth.getUser(token);

  if (error) {
    throw error;
  }

  return user;
}
