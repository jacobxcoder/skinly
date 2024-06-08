import { supabase } from '@/integrations/supabase';
import env from '@/env';

export async function register(email: string, password: string) {
  const {
    data: { user },
    error
  } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: env.AUTH_REGISTER_REDIRECT_URL
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

export async function resetPasswordForEmail(email: string) {
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: env.AUTH_RESET_PASSWORD_URL
  });

  if (error) {
    throw error;
  }
}

export async function updatePassword(password: string) {
  const { error } = await supabase.auth.updateUser({
    password
  });

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
