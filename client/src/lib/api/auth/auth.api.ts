import { supabase } from '$lib/api';
import { type User } from '@supabase/supabase-js';
import { PUBLIC_AUTH_REGISTER_REDIRECT_URL } from '$env/static/public';

export type { User };

export async function register(email: string, password: string) {
  const {
    data: { user },
    error
  } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: PUBLIC_AUTH_REGISTER_REDIRECT_URL
    }
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

export async function getUser() {
  const {
    data: { user },
    error
  } = await supabase.auth.getUser();

  if (error) {
    throw error;
  }

  if (!user) {
    return null;
  }

  return user;
}
