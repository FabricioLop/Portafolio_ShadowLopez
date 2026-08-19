import { Component, HostListener, effect, inject, signal } from '@angular/core';
import { Language } from '../../services/language';
import { ThemeService } from '../../services/theme.service';
import { TranslationService } from '../../services/translation.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar {
  private langService = inject(Language);
  themeService = inject(ThemeService);
  ts = inject(TranslationService);

  lang = this.langService.current;
  menuOpen = signal(false);

  constructor() {
    // Bloquea el scroll del fondo mientras el menú móvil está abierto.
    effect(() => {
      document.body.style.overflow = this.menuOpen() ? 'hidden' : '';
    });
  }

  changeLang(lang: string) { this.langService.setLanguage(lang); }
  toggleMenu() { this.menuOpen.update(v => !v); }
  closeMenu() { this.menuOpen.set(false); }

  @HostListener('document:keydown.escape')
  onEscape() { this.closeMenu(); }
}
