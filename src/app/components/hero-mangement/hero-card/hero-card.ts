import { Component, effect, inject, input, output } from '@angular/core';
import { Hero, NextOrPrevious } from '../../../models/hero-models';
import { HeroImage } from '../hero-image/hero-image';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { HeroManagementSerivce } from '../../../services/hero-management.service';

@Component({
  selector: 'app-hero-card',
  imports: [MatButtonModule, MatCardModule, HeroImage],
  templateUrl: './hero-card.html',
  styleUrl: './hero-card.scss',
})
export class HeroCard {
  readonly NextOrPrevious = NextOrPrevious;

  private heroService = inject(HeroManagementSerivce);

  changeHero = output<NextOrPrevious>();

  editHero = output<boolean>();

  detailsView = input<boolean>();

  selectedHero = input.required<Hero>();

  nextButtonDisabled = false;

  prevButtonDisabled = false;

  constructor() {
    effect(() => {
      const { nextCard, prevCard } = this.heroService.nextAndPreviousCard();
      this.nextButtonDisabled = !nextCard;
      this.prevButtonDisabled = !prevCard;
    });
  }

  emitChangeHero(action: NextOrPrevious) {
    this.changeHero.emit(action);
  }

  emitEditHero() {
    this.editHero.emit(true);
  }
}
