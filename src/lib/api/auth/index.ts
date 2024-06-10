import { type User } from '@supabase/supabase-js';
import { register, login, logout, getUser } from './auth.api';

export { register, login, logout, getUser, type User };
