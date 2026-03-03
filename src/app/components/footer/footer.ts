import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.html', // Verifica que sea footer.html y no footer.component.html
  styleUrl: './footer.css',   // Verifica que sea footer.css y no footer.component.css
})
export class Footer implements OnInit, OnDestroy {
  frases: string[] = [
    "Transformando café y lógica en software de alto impacto.",
    "Arquitecturando el mañana, un commit a la vez.",
    "Especialista en resolver problemas complejos con código simple.",
    "Apasionado por el Backend, enfocado en la escalabilidad.",
    "Construyendo puentes entre ideas y productos reales.",
    "Clean Code como filosofía, rendimiento como meta.",
    "De la idea a la producción: ciclo completo de desarrollo.",
    "Explorando las fronteras de DevSecOps y Ciberseguridad.",
    "Entusiasta de las arquitecturas limpias y patrones de diseño.",
    "Software Engineer en formación constante.",
    "Lógica de negocio sólida para tiempos de respuesta rápidos.",
    "Domador de bugs, arquitecto de soluciones.",
    "Buscando siempre la eficiencia en el litoral del código.",
    "Convirtiendo datos en decisiones estratégicas.",
    "Pasión por la tecnología, disciplina por el gimnasio.",
    "Pensamiento estratégico aplicado al desarrollo de software.",
    "Junior en experiencia, Senior en actitud y aprendizaje.",
    "Integrando seguridad en cada línea de código.",
    "Desplegando innovación en infraestructuras cloud.",
    "ShadowLopez: Programación con propósito."
  ];

  fraseActual: string = "";
  private indexFrase: number = 0;
  private loopActivo: boolean = true;

  constructor(private cdr: ChangeDetectorRef) {} // Inyectamos el detector de cambios

  ngOnInit() {
    this.iniciarEfecto();
  }

  ngOnDestroy() {
    this.loopActivo = false;
  }

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
      this.cdr.detectChanges(); // Forzamos a Angular a ver el cambio de letra
      await this.delay(50);
    }
  }

  private async borrarFrase() {
    const texto = this.fraseActual;
    for (let i = texto.length; i >= 0; i--) {
      if (!this.loopActivo) return;
      this.fraseActual = texto.substring(0, i);
      this.cdr.detectChanges(); // Forzamos a Angular a ver el cambio al borrar
      await this.delay(30);
    }
  }

  private delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}