import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Language } from '../../services/language';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar {
  constructor(public langService: Language) {}

  changeLang(lang: string) {
    this.langService.setLanguage(lang);
  }
}