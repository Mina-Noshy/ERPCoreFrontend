import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService 
{
  private readonly DARK_THEME = 'dark-theme';
  private readonly LIGHT_THEME = 'light-theme';
  private readonly ACTIVE_THEME_KEY = 'active-theme';

  toggleTheme(): string {
    const activeTheme = this.getActiveTheme();

    if (activeTheme === this.DARK_THEME) {
      localStorage.setItem(this.ACTIVE_THEME_KEY, this.LIGHT_THEME);
      return this.LIGHT_THEME;
    } else {
      localStorage.setItem(this.ACTIVE_THEME_KEY, this.DARK_THEME);
      return this.DARK_THEME;
    }
  }

  getActiveTheme(): string {
    const storedTheme = localStorage.getItem(this.ACTIVE_THEME_KEY);

    if (storedTheme) {
      return storedTheme;
    }

    return this.DARK_THEME;
  }

  getActiveThemeCssClass(): string {
    return this.getActiveTheme();
  }
}
