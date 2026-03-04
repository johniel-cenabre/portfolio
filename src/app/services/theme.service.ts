import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export type Theme = 'light' | 'dark';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly THEME_STORAGE_KEY = 'portfolio-theme';
  private themeSubject: BehaviorSubject<Theme>;
  public theme$: Observable<Theme>;

  constructor() {
    // Get initial theme from localStorage or default to 'light'
    const savedTheme = this.getStoredTheme();
    this.themeSubject = new BehaviorSubject<Theme>(savedTheme);
    this.theme$ = this.themeSubject.asObservable();
    
    // Apply initial theme
    this.applyTheme(savedTheme);
  }

  getCurrentTheme(): Theme {
    return this.themeSubject.value;
  }

  setTheme(theme: Theme): void {
    this.themeSubject.next(theme);
    this.storeTheme(theme);
    this.applyTheme(theme);
  }

  toggleTheme(): void {
    const newTheme = this.themeSubject.value === 'light' ? 'dark' : 'light';
    this.setTheme(newTheme);
  }

  private applyTheme(theme: Theme): void {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }

  private getStoredTheme(): Theme {
    if (typeof window !== 'undefined' && window.localStorage) {
      const stored = localStorage.getItem(this.THEME_STORAGE_KEY);
      if (stored === 'light' || stored === 'dark') {
        return stored as Theme;
      }
    }
    return 'light';
  }

  private storeTheme(theme: Theme): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem(this.THEME_STORAGE_KEY, theme);
    }
  }
}
