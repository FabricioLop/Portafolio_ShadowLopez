import { Component, DestroyRef, OnInit, computed, effect, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslationService } from '../../services/translation.service';

type FormStatus = 'idle' | 'missing' | 'bad-email' | 'sending' | 'success' | 'error';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './footer.html',
  styleUrl: './footer.css',
})
export class Footer implements OnInit {
  ts = inject(TranslationService);
  private destroyRef = inject(DestroyRef);

  // Contact form
  formName    = signal('');
  formEmail   = signal('');
  formSubject = signal('');
  formMessage = signal('');
  formStatus  = signal<FormStatus>('idle');

  // Frase con efecto máquina de escribir
  private quotes = computed(() => this.ts.t().contact.quotes);
  private charCount = signal(0);
  private quoteIndex = signal(0);
  readonly quote = computed(() =>
    (this.quotes()[this.quoteIndex() % this.quotes().length] ?? '').slice(0, this.charCount())
  );

  private timer?: ReturnType<typeof setTimeout>;
  private running = true;
  private readonly reducedMotion =
    typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

  constructor() {
    // Al cambiar de idioma, reinicia la frase en curso para no mezclar textos.
    effect(() => {
      this.quotes();
      this.charCount.set(this.reducedMotion ? Number.MAX_SAFE_INTEGER : 0);
    });
  }

  ngOnInit() {
    this.destroyRef.onDestroy(() => {
      this.running = false;
      clearTimeout(this.timer);
    });
    if (!this.reducedMotion) this.type();
  }

  /** Escribe, espera, borra y pasa a la siguiente frase — sin detectChanges manual. */
  private type() {
    if (!this.running) return;
    const full = this.quotes()[this.quoteIndex() % this.quotes().length] ?? '';
    const n = this.charCount();

    if (n < full.length) {
      this.charCount.set(n + 1);
      this.timer = setTimeout(() => this.type(), 50);
      return;
    }
    this.timer = setTimeout(() => this.erase(), 2000);
  }

  private erase() {
    if (!this.running) return;
    const n = this.charCount();
    if (n > 0) {
      this.charCount.set(n - 1);
      this.timer = setTimeout(() => this.erase(), 30);
      return;
    }
    this.quoteIndex.update(i => i + 1);
    this.timer = setTimeout(() => this.type(), 500);
  }

  async sendForm() {
    if (this.formStatus() === 'sending') return;

    if (!this.formName().trim() || !this.formEmail().trim() || !this.formMessage().trim()) {
      this.formStatus.set('missing');
      return;
    }
    if (!this.isValidEmail(this.formEmail())) {
      this.formStatus.set('bad-email');
      return;
    }
    this.formStatus.set('sending');

    const SERVICE_ID  = 'service_jt940vb';
    const TEMPLATE_ID = 'template_35qlz1r';
    const PUBLIC_KEY  = '1tCuiJ8MA0pCKl5MS';

    try {
      const res = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          service_id:  SERVICE_ID,
          template_id: TEMPLATE_ID,
          user_id:     PUBLIC_KEY,
          template_params: {
            from_name:  this.formName(),
            from_email: this.formEmail(),
            subject:    this.formSubject(),
            message:    this.formMessage(),
          }
        })
      });
      this.formStatus.set(res.ok ? 'success' : 'error');
    } catch {
      this.formStatus.set('error');
    }

    if (this.formStatus() === 'success') {
      this.formName.set(''); this.formEmail.set('');
      this.formSubject.set(''); this.formMessage.set('');
    }
    setTimeout(() => this.formStatus.set('idle'), 5000);
  }

  private isValidEmail(value: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim());
  }
}
