import { Injectable } from '@angular/core';

export type Theme = 'light' | 'dark' | 'system';
const STORAGE_KEY = 'theme';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private current: Theme = 'system';

  init() {
    // carga preferencia guardada o usa 'system'
    const saved = (localStorage.getItem(STORAGE_KEY) as Theme) || 'system';
    this.setTheme(saved, false);
  }

  setTheme(theme: Theme, persist = true) {
    this.current = theme;

    const root = document.documentElement; // <html>
    const prefersDark = window.matchMedia?.('(prefers-color-scheme: dark)').matches;

    const shouldBeDark = theme === 'dark' || (theme === 'system' && prefersDark);

    root.classList.toggle('dark', shouldBeDark);
    if (persist) localStorage.setItem(STORAGE_KEY, theme);
  }

  toggle() {
    // alterna entre dark/light; si estabas en 'system', pasa a 'dark'
    const next: Theme =
      this.current === 'dark' ? 'light' :
      this.current === 'light' ? 'dark' : 'dark';
    this.setTheme(next);
  }

  get value(): Theme { return this.current; }
}
