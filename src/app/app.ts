import { Component, signal } from '@angular/core';
import { Navbar } from './components/navbar/navbar';
import { About } from './components/about/about';
import { Projects } from './components/projects/projects';
import { Skills } from './components/skills/skills';
import { Footer } from './components/footer/footer';
@Component({
  selector: 'app-root',
  imports: [Navbar,About,Projects,Skills,Footer],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('portafolio-dev');
}
