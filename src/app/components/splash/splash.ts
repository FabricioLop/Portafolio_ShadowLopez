import { Component, OnInit, Output, EventEmitter, inject, signal } from '@angular/core';
import { TranslationService } from '../../services/translation.service';

@Component({
  selector: 'app-splash',
  standalone: true,
  imports: [],
  templateUrl: './splash.html',
  styleUrl: './splash.css'
})
export class Splash implements OnInit {
  @Output() done = new EventEmitter<void>();
  ts = inject(TranslationService);

  line1 = signal('');
  line2 = signal('');
  line3 = signal('');
  line4 = signal('');
  showSkip = signal(false);
  hiding = signal(false);

  ngOnInit() {
    document.addEventListener('keydown', () => this.dismiss(), { once: true });
    document.addEventListener('click', () => this.dismiss(), { once: true });
    this.runSequence();
  }

  private async runSequence() {
    const t = this.ts.t();
    await this.type(t.splash.line1, this.line1, 40);
    await this.delay(200);
    await this.type(t.splash.line2, this.line2, 35);
    await this.delay(200);
    await this.type(t.splash.line3, this.line3, 35);
    await this.delay(300);
    await this.type(t.splash.line4, this.line4, 40);
    this.showSkip.set(true);
    await this.delay(1800);
    this.dismiss();
  }

  private async type(text: string, target: ReturnType<typeof signal<string>>, speed: number) {
    for (let i = 0; i <= text.length; i++) {
      target.set(text.slice(0, i));
      await this.delay(speed);
    }
  }

  dismiss() {
    if (this.hiding()) return;
    this.hiding.set(true);
    setTimeout(() => this.done.emit(), 600);
  }

  private delay(ms: number) {
    return new Promise(r => setTimeout(r, ms));
  }
}
