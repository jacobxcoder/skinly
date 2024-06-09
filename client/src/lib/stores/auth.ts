import { writable } from 'svelte/store';
import { z } from 'zod';

const AUTH_LOCAL_STORAGE_KEY = 'skinly-auth-storage-key';

const AuthSchema = z.object({
  user_id: z.string(),
  email: z.string().email()
});

export type Auth = z.infer<typeof AuthSchema>;

function getCachedAuthData(): Auth | null {
  const cachedData = localStorage.getItem(AUTH_LOCAL_STORAGE_KEY);
  if (!cachedData) return null;

  try {
    return AuthSchema.parse(JSON.parse(cachedData));
  } catch (error) {
    console.error('Failed to parse cached auth data:', error);
  }

  return null;
}

export const auth = writable<Auth | null>(getCachedAuthData());

auth.subscribe((value) => {
  if (value) {
    localStorage.setItem(AUTH_LOCAL_STORAGE_KEY, JSON.stringify(value));
  } else {
    localStorage.removeItem(AUTH_LOCAL_STORAGE_KEY);
  }
});
