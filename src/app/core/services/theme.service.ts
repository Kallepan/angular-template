import { DOCUMENT } from '@angular/common';
import { effect, inject, Injectable, signal } from '@angular/core';

export type Theme = 'light' | 'dark';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly document = inject(DOCUMENT);
  private readonly currentTheme = signal<Theme>('light');

  constructor() {
    // Create a listener for the current theme
    effect(() => {
      const theme = this.currentTheme();
      switch (theme) {
        case 'light':
          this.document.documentElement.classList.remove('dark-mode');
          break;
        case 'dark':
          this.document.documentElement.classList.add('dark-mode');
          break;
      }
      this._setThemeInLocalStorage(theme);
    });

    // Load the theme from local storage
    this.currentTheme.set(this._getThemeFromLocalStorage());
  }

  isDarkTheme(): boolean {
    return this.currentTheme() === 'dark';
  }

  toggleTheme() {
    this.currentTheme.set(this.currentTheme() === 'light' ? 'dark' : 'light');
  }

  private _setThemeInLocalStorage(theme: Theme) {
    this.document.defaultView?.localStorage?.setItem('preferred_theme', theme);
  }

  private _getThemeFromLocalStorage(): Theme {
    return (this.document.defaultView?.localStorage?.getItem(
      'preferred_theme'
    ) ?? 'light') as Theme;
  }
}
