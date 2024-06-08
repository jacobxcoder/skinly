import { writable } from 'svelte/store';

export enum Theme {
  LIGHT = 'light',
  DARK = 'dark'
}

export const theme = writable<Theme>(Theme.LIGHT);

export function toggleTheme() {}
