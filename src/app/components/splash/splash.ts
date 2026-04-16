import { Component, OnInit, Output, EventEmitter, signal } from '@angular/core';

@Component({
  selector: 'app-splash',
  standalone: true,
  imports: [],
  templateUrl: './splash.html',
  styleUrl: './splash.css'
})
export class Splash implements OnInit {
  @Output() done = new EventEmitter<void>();

  hiding   = signal(false);
  showSkip = signal(false);

  ngOnInit() {
    document.addEventListener('keydown', () => this.dismiss(), { once: true });
    document.addEventListener('click',   () => this.dismiss(), { once: true });
    setTimeout(() => this.showSkip.set(true), 1300);
    setTimeout(() => this.dismiss(), 3200);
  }

  dismiss() {
    if (this.hiding()) return;
    this.hiding.set(true);
    setTimeout(() => this.done.emit(), 700);
  }
}
