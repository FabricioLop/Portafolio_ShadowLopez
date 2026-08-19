import { Component, DestroyRef, OnInit, inject, signal } from '@angular/core';

@Component({
  selector: 'app-scroll-progress',
  standalone: true,
  imports: [],
  template: `<div class="scroll-bar" [style.width.%]="progress()" aria-hidden="true"></div>`,
  styles: [`
    .scroll-bar {
      position: fixed;
      top: 0; left: 0;
      height: 3px;
      background: linear-gradient(90deg, #8a2be2, #a052ff, #c084fc);
      z-index: 9998;
      will-change: width;
      box-shadow: 0 0 8px rgba(138,43,226,0.6);
    }
  `]
})
export class ScrollProgress implements OnInit {
  private destroyRef = inject(DestroyRef);
  progress = signal(0);

  private queued = false;

  ngOnInit() {
    const onScroll = () => {
      // rAF: como mucho un cálculo por frame, aunque el scroll dispare decenas de eventos.
      if (this.queued) return;
      this.queued = true;
      requestAnimationFrame(() => {
        this.queued = false;
        const el = document.documentElement;
        const total = el.scrollHeight - el.clientHeight;
        this.progress.set(total > 0 ? (el.scrollTop / total) * 100 : 0);
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    onScroll();

    this.destroyRef.onDestroy(() => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    });
  }
}
