import { Component, input, output } from '@angular/core';
import { Hero, NextOrPrevious } from '../../../models/hero-models';
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
  readonly NextOrPrevious = NextOrPrevious;
  changeHero = output<NextOrPrevious>();

  editHero = output<boolean>();

  detailsView = input<boolean>();

  selectedHero = input.required<Hero>();

  emitChangeHero(action: NextOrPrevious) {
    this.changeHero.emit(action);
  }

  emitEditHero() {
    this.editHero.emit(true);
  }
}
