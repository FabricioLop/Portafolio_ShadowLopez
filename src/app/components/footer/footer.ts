import { Component, OnInit, OnDestroy, ChangeDetectorRef, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslationService } from '../../services/translation.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './footer.html',
  styleUrl: './footer.css',
})
export class Footer implements OnInit, OnDestroy {
  private cdr = inject(ChangeDetectorRef);
  ts = inject(TranslationService);

  // Contact form
  formName    = signal('');
  formEmail   = signal('');
  formSubject = signal('');
  formMessage = signal('');
  formStatus  = signal<'idle' | 'sending' | 'success' | 'error'>('idle');

  // Typing quotes
  frases: string[] = [
    "Transformando café y lógica en software de alto impacto.",
    "Arquitecturando el mañana, un commit a la vez.",
    "Especialista en resolver problemas complejos con código simple.",
    "Apasionado por el Backend, enfocado en la escalabilidad.",
    "Construyendo puentes entre ideas y productos reales.",
    "Clean Code como filosofía, rendimiento como meta.",
    "De la idea a la producción: ciclo completo de desarrollo.",
    "Explorando las fronteras de DevSecOps y Ciberseguridad.",
    "Junior en experiencia, Senior en actitud y aprendizaje.",
    "ShadowLopez: Programación con propósito.",
  ];

  fraseActual: string = '';
  private indexFrase: number = 0;
  private loopActivo: boolean = true;

  ngOnInit() { this.iniciarEfecto(); }
  ngOnDestroy() { this.loopActivo = false; }

  private async iniciarEfecto() {
    while (this.loopActivo) {
      await this.escribirFrase(this.frases[this.indexFrase]);
      await this.delay(2000);
      await this.borrarFrase();
      this.indexFrase = (this.indexFrase + 1) % this.frases.length;
      await this.delay(500);
    }
  }

  private async escribirFrase(texto: string) {
    for (let i = 0; i <= texto.length; i++) {
      if (!this.loopActivo) return;
      this.fraseActual = texto.substring(0, i);
      this.cdr.detectChanges();
      await this.delay(50);
    }
  }

  private async borrarFrase() {
    const texto = this.fraseActual;
    for (let i = texto.length; i >= 0; i--) {
      if (!this.loopActivo) return;
      this.fraseActual = texto.substring(0, i);
      this.cdr.detectChanges();
      await this.delay(30);
    }
  }

  private delay(ms: number) { return new Promise(r => setTimeout(r, ms)); }

  async sendForm() {
    if (!this.formName() || !this.formEmail() || !this.formMessage()) return;
    this.formStatus.set('sending');

    const SERVICE_ID  = 'service_jt940vb';
    const TEMPLATE_ID = 'template_35qlz1r';
    const PUBLIC_KEY  = '1tCuiJ8MA0pCKl5MS';

    try {
      const res = await fetch(`https://api.emailjs.com/api/v1.0/email/send`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          service_id:  SERVICE_ID,
          template_id: TEMPLATE_ID,
          user_id:     PUBLIC_KEY,
          template_params: {
            from_name:    this.formName(),
            from_email:   this.formEmail(),
            subject:      this.formSubject(),
            message:      this.formMessage(),
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
}
