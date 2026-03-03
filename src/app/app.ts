import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './components/navbar/navbar';
import { About } from './components/about/about';
import { Projects } from './components/projects/projects';
import { Skills } from './components/skills/skills';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet,Navbar,About,Projects,Skills],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('portafolio-dev');
}
