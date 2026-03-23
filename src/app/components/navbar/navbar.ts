import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Language } from '../../services/language';
import { ThemeService } from '../../services/theme.service';
import { TranslationService } from '../../services/translation.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar {
  langService = inject(Language);
  themeService = inject(ThemeService);
  ts = inject(TranslationService);
  menuOpen = signal(false);

  changeLang(lang: string) { this.langService.setLanguage(lang); }
  toggleMenu() { this.menuOpen.update(v => !v); }
  closeMenu() { this.menuOpen.set(false); }
}
