import { supabase } from '$lib/api';
import { PUBLIC_AUTH_REGISTER_REDIRECT_URL } from '$env/static/public';
import { RegisterUserSchema, LoginUserSchema } from './auth.validator';

export async function register(form: RegisterUserSchema) {
  const validatedInput = RegisterUserSchema.parse(form);

  const {
    data: { user },
    error
  } = await supabase.auth.signUp({
    email: validatedInput.email,
    password: validatedInput.password,
    options: {
      emailRedirectTo: PUBLIC_AUTH_REGISTER_REDIRECT_URL
    }
  });

  if (error) {
    throw error;
  }

  return user;
}

export async function login(form: LoginUserSchema) {
  const validatedInput = LoginUserSchema.parse(form);

  const {
    data: { session },
    error
  } = await supabase.auth.signInWithPassword(validatedInput);

  if (error) {
    throw error;
  }

  return session?.user;
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
