import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Language{
  // Por defecto empezamos en Inglés como pediste
  private language = new BehaviorSubject<string>('en');
  currentLanguage$ = this.language.asObservable();

  setLanguage(lang: string) {
    this.language.next(lang);
  }
}