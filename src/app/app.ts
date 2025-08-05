import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeroMangement } from './components/hero-mangement/hero-mangement';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeroMangement],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('super-hero-management');
}
