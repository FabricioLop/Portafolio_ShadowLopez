import { Injectable, signal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';

export type AppLanguage = 'es' | 'en';

const STORAGE_KEY = 'lang';

@Injectable({ providedIn: 'root' })
export class Language {
  /** Idioma activo. Fuente de verdad para TranslationService y la navbar. */
  readonly current = signal<AppLanguage>(Language.initialLanguage());

  /** Compatibilidad con consumidores que aún usan observables / async pipe. */
  readonly currentLanguage$ = toObservable(this.current);

  constructor() {
    this.applyToDocument(this.current());
  }

  setLanguage(lang: string) {
    const next: AppLanguage = lang === 'en' ? 'en' : 'es';
    this.current.set(next);
    try { localStorage.setItem(STORAGE_KEY, next); } catch { /* modo privado */ }
    this.applyToDocument(next);
  }

  /** Preferencia guardada > idioma del navegador > español. */
  private static initialLanguage(): AppLanguage {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === 'es' || saved === 'en') return saved;
    } catch { /* modo privado */ }
    return navigator.language?.toLowerCase().startsWith('es') ? 'es' : 'en';
  }

  /** Mantiene <html lang> sincronizado (lectores de pantalla y SEO). */
  private applyToDocument(lang: AppLanguage) {
    document.documentElement.lang = lang;
  }
}
