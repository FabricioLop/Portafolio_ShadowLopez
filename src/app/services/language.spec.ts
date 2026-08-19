import { TestBed } from '@angular/core/testing';

import { Language } from './language';

describe('Language', () => {
  let service: Language;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({});
    service = TestBed.inject(Language);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('persists the chosen language and syncs <html lang>', () => {
    service.setLanguage('en');
    expect(service.current()).toBe('en');
    expect(localStorage.getItem('lang')).toBe('en');
    expect(document.documentElement.lang).toBe('en');

    service.setLanguage('es');
    expect(service.current()).toBe('es');
    expect(document.documentElement.lang).toBe('es');
  });

  it('falls back to Spanish for unknown codes', () => {
    service.setLanguage('fr');
    expect(service.current()).toBe('es');
  });
});
