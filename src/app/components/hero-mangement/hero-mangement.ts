import { Component, effect } from '@angular/core';
import { HeroManagementSerivce } from '../../services/hero-management-service';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Hero, NextOrPreviousHero } from '../../models/hero-models';
import { HeroImage } from './hero-image/hero-image/hero-image';

@Component({
  selector: 'app-hero-mangement',
  imports: [MatButtonModule, MatCardModule, HeroImage],
  templateUrl: './hero-mangement.html',
  styleUrl: './hero-mangement.scss',
})
export class HeroMangement {
  readonly NextOrPreviousHero = NextOrPreviousHero;
  constructor(private heroService: HeroManagementSerivce) {
    effect(() => {
      this.selectedHero = this.heroService.selectedHero();
    });
  }

  selectedHero: Hero | null = null;

  ngOnInit() {
    console.log(this.heroService.herosList());
  }

  changeSelectedHero(action: NextOrPreviousHero) {
    this.heroService.updateSelectedHeroByIndex(action);
  }

  onDeleteHero(heroId: string) {
    this.heroService.removeHero(heroId);
    console.log(this.heroService.herosList());
  }
}
