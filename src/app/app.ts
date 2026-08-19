import { Component, inject, signal } from '@angular/core';
import { Navbar }         from './components/navbar/navbar';
import { Splash }         from './components/splash/splash';
import { ScrollProgress } from './components/scroll-progress/scroll-progress';
import { About }          from './components/about/about';
import { Timeline }       from './components/timeline/timeline';
import { Projects }       from './components/projects/projects';
import { Skills }         from './components/skills/skills';
import { Certificates }   from './components/certificates/certificates';
import { Footer }         from './components/footer/footer';
import { TranslationService } from './services/translation.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    Navbar, Splash, ScrollProgress,
    About, Timeline, Projects, Skills, Certificates, Footer
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  ts = inject(TranslationService);

  /** El splash es un overlay: el contenido se renderiza debajo desde el primer frame. */
  showSplash = signal(Splash.shouldShow());

  /** El marquee necesita la lista duplicada para que el bucle sea continuo. */
  readonly marqueeTech = [
    'Spring Boot', 'Angular', 'AWS EC2', 'Docker', 'TypeScript', 'PostgreSQL',
    'FastAPI', 'Next.js', 'GitHub Actions', 'Linux', 'Supabase', 'n8n',
  ];

  private readonly reducedMotion =
    typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

  onSplashDone() {
    this.showSplash.set(false);
  }

  onPhotoTilt(event: MouseEvent) {
    if (this.reducedMotion) return;
    const el = event.currentTarget as HTMLElement;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (event.clientX - cx) / (rect.width / 2);
    const dy = (event.clientY - cy) / (rect.height / 2);
    el.style.transition = 'transform 0.08s ease';
    el.style.transform = `perspective(700px) rotateY(${dx * 7}deg) rotateX(${-dy * 7}deg)`;
  }

  onPhotoReset(event: MouseEvent) {
    if (this.reducedMotion) return;
    const el = event.currentTarget as HTMLElement;
    el.style.transition = 'transform 0.55s ease';
    el.style.transform = 'perspective(700px) rotateY(0deg) rotateX(0deg)';
  }
}
