import { AfterViewInit, Component, DestroyRef, ElementRef, inject, signal } from '@angular/core';
import { TranslationService } from '../../services/translation.service';
import { MANDU_START, monthsSince } from '../../utils/experience';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [],
  templateUrl: './about.html',
  styleUrl: './about.css',
})
export class About implements AfterViewInit {
  ts = inject(TranslationService);
  private el = inject(ElementRef<HTMLElement>);
  private destroyRef = inject(DestroyRef);

  // Mantener alineado con: 25 certificados en certificates.ts, 4 tarjetas en projects.html.
  // `mandu` se calcula solo desde la fecha de inicio, no hay que tocarlo cada mes.
  private readonly targets = {
    certs: 25,
    projects: 4,
    langs: 5,
    months: 36,
    mandu: monthsSince(MANDU_START),
  };

  certs    = signal(0);
  projects = signal(0);
  langs    = signal(0);
  months   = signal(0);
  mandu    = signal(0);

  private frames: number[] = [];

  ngAfterViewInit() {
    const target: Element =
      this.el.nativeElement.querySelector('.stats-bar') ?? this.el.nativeElement;

    // Sin animación si el usuario pidió reducir movimiento, o si no hay
    // IntersectionObserver (entornos de test): mostramos el valor final.
    const skipAnimation =
      typeof IntersectionObserver === 'undefined' ||
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

    if (skipAnimation) {
      this.certs.set(this.targets.certs);
      this.projects.set(this.targets.projects);
      this.langs.set(this.targets.langs);
      this.months.set(this.targets.months);
      this.mandu.set(this.targets.mandu);
      return;
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      this.animate(this.certs,    this.targets.certs,    1200);
      this.animate(this.projects, this.targets.projects, 800);
      this.animate(this.langs,    this.targets.langs,    600);
      this.animate(this.months,   this.targets.months,   1500);
      this.animate(this.mandu,    this.targets.mandu,    900);
    }, { threshold: 0.3 });

    observer.observe(target);

    this.destroyRef.onDestroy(() => {
      observer.disconnect();
      this.frames.forEach(cancelAnimationFrame);
      this.frames = [];
    });
  }

  /** Cuenta con requestAnimationFrame: sigue el refresco real y no deja timers colgando. */
  private animate(target: ReturnType<typeof signal<number>>, to: number, duration: number) {
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      target.set(Math.round(to * eased));
      if (p < 1) this.frames.push(requestAnimationFrame(tick));
    };
    this.frames.push(requestAnimationFrame(tick));
  }
}
