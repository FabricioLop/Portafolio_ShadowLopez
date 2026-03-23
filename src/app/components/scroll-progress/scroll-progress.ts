import { Component, HostListener, signal } from '@angular/core';

@Component({
  selector: 'app-scroll-progress',
  standalone: true,
  imports: [],
  template: `<div class="scroll-bar" [style.width.%]="progress()"></div>`,
  styles: [`
    .scroll-bar {
      position: fixed;
      top: 0; left: 0;
      height: 3px;
      background: linear-gradient(90deg, #8a2be2, #a052ff, #c084fc);
      z-index: 9998;
      transition: width 0.1s linear;
      box-shadow: 0 0 8px rgba(138,43,226,0.6);
    }
  `]
})
export class ScrollProgress {
  progress = signal(0);

  @HostListener('window:scroll')
  onScroll() {
    const el = document.documentElement;
    const scrolled = el.scrollTop;
    const total = el.scrollHeight - el.clientHeight;
    this.progress.set(total > 0 ? (scrolled / total) * 100 : 0);
  }
}
