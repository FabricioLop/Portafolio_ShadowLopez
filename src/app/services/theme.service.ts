import { Injectable, signal } from '@angular/core';

const STORAGE_KEY = 'theme';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  readonly isDark = signal<boolean>(true);

  constructor() {
    this.isDark.set(ThemeService.initialIsDark());
    this.apply(this.isDark());
  }

  toggle() {
    this.isDark.update(v => !v);
    const theme = this.isDark() ? 'dark' : 'light';
    try { localStorage.setItem(STORAGE_KEY, theme); } catch { /* modo privado */ }
    this.apply(this.isDark());
  }

  /**
   * Preferencia guardada > oscuro. El diseño es dark-first, así que el modo
   * oscuro sigue siendo la primera impresión aunque el sistema esté en claro.
   */
  private static initialIsDark(): boolean {
    try {
      return localStorage.getItem(STORAGE_KEY) !== 'light';
    } catch {
      return true;
    }
  }

  private apply(isDark: boolean) {
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
    // Color de la barra del navegador en móvil.
    document.querySelector('meta[name="theme-color"]')
      ?.setAttribute('content', isDark ? '#14112b' : '#eae7f7');
  }
}
