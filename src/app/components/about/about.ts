import { Component, inject, OnInit, signal, ElementRef } from '@angular/core';
import { TranslationService } from '../../services/translation.service';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [],
  templateUrl: './about.html',
  styleUrl: './about.css',
})
export class About implements OnInit {
  ts = inject(TranslationService);
  private el = inject(ElementRef);

  certs   = signal(0);
  projects= signal(0);
  langs   = signal(0);
  months  = signal(0);

  private targets = { certs: 25, projects: 3, langs: 5, months: 36 };
  private animated = false;

  ngOnInit() {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !this.animated) {
        this.animated = true;
        this.animateCounter(this.certs,    this.targets.certs,    1200);
        this.animateCounter(this.projects, this.targets.projects, 800);
        this.animateCounter(this.langs,    this.targets.langs,    600);
        this.animateCounter(this.months,   this.targets.months,   1500);
        observer.disconnect();
      }
    }, { threshold: 0.3 });
    observer.observe(this.el.nativeElement.querySelector('.stats-bar') ?? this.el.nativeElement);
  }

  private animateCounter(sig: ReturnType<typeof signal<number>>, target: number, duration: number) {
    const steps = 40;
    const step  = target / steps;
    const interval = duration / steps;
    let current = 0;
    const timer = setInterval(() => {
      current = Math.min(current + step, target);
      sig.set(Math.round(current));
      if (current >= target) clearInterval(timer);
    }, interval);
  }
}
