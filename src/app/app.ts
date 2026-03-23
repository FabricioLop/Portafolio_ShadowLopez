import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Navbar }         from './components/navbar/navbar';
import { Splash }         from './components/splash/splash';
import { ScrollProgress } from './components/scroll-progress/scroll-progress';
import { About }          from './components/about/about';
import { Timeline }       from './components/timeline/timeline';
import { Projects }       from './components/projects/projects';
import { Skills }         from './components/skills/skills';
import { Certificates }   from './components/certificates/certificates';
import { Footer }         from './components/footer/footer';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule, Navbar, Splash, ScrollProgress,
    About, Timeline, Projects, Skills, Certificates, Footer
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  showSplash = signal(true);

  onSplashDone() {
    this.showSplash.set(false);
  }
}
