import { Component, OnDestroy, OnInit, output, signal } from '@angular/core';

const SESSION_KEY = 'splash-seen';

@Component({
  selector: 'app-splash',
  standalone: true,
  imports: [],
  templateUrl: './splash.html',
  styleUrl: './splash.css'
})
export class Splash implements OnInit, OnDestroy {
  readonly done = output<void>();

  hiding   = signal(false);
  showSkip = signal(false);

  private timers: ReturnType<typeof setTimeout>[] = [];
  private readonly dismissOnInput = () => this.dismiss();

  /** Solo la primera visita de la sesión, y nunca con "reducir movimiento". */
  static shouldShow(): boolean {
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return false;
    try { return sessionStorage.getItem(SESSION_KEY) !== '1'; } catch { return true; }
  }

  ngOnInit() {
    try { sessionStorage.setItem(SESSION_KEY, '1'); } catch { /* modo privado */ }

    document.addEventListener('keydown', this.dismissOnInput, { once: true });
    document.addEventListener('pointerdown', this.dismissOnInput, { once: true });
    this.timers.push(setTimeout(() => this.showSkip.set(true), 1300));
    this.timers.push(setTimeout(() => this.dismiss(), 3200));
  }

  ngOnDestroy() {
    this.cleanup();
  }

  dismiss() {
    if (this.hiding()) return;
    this.hiding.set(true);
    this.cleanup();
    this.timers.push(setTimeout(() => this.done.emit(), 700));
  }

  private cleanup() {
    document.removeEventListener('keydown', this.dismissOnInput);
    document.removeEventListener('pointerdown', this.dismissOnInput);
    this.timers.forEach(clearTimeout);
    this.timers = [];
  }
}
