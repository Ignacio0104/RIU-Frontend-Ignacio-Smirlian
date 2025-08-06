import { Component, input, output } from '@angular/core';
import { Hero, NextOrPreviousHero } from '../../../models/hero-models';
import { HeroImage } from '../hero-image/hero-image';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-hero-card',
  imports: [MatButtonModule, MatCardModule, HeroImage],
  templateUrl: './hero-card.html',
  styleUrl: './hero-card.scss',
})
export class HeroCard {
  readonly NextOrPreviousHero = NextOrPreviousHero;
  changeHero = output<NextOrPreviousHero>();

  selectedHero = input.required<Hero>();

  emitChangeHero(action: NextOrPreviousHero) {
    this.changeHero.emit(action);
  }
}
