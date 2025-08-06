import { Component, effect } from '@angular/core';
import { HeroManagementSerivce } from '../../services/hero-management-service';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Hero, NextOrPreviousHero } from '../../models/hero-models';
import { HeroImage } from './hero-image/hero-image';
import { HeroCard } from './hero-card/hero-card';
import { HeroList } from '../hero-list/hero-list';

@Component({
  selector: 'app-hero-mangement',
  imports: [HeroCard, HeroList],
  templateUrl: './hero-mangement.html',
  styleUrl: './hero-mangement.scss',
})
export class HeroMangement {
  constructor(private heroService: HeroManagementSerivce) {
    effect(() => {
      this.selectedHero = this.heroService.selectedHero();
      this.heroesList = this.heroService.heroesList();
    });
  }

  selectedHero: Hero | null = null;

  heroesList: Hero[] = [];

  ngOnInit() {
    //console.log(this.heroService.heroesList());
  }

  changeSelectedHero(action: NextOrPreviousHero) {
    this.heroService.updateSelectedHeroByIndex(action);
  }

  onDeleteHero(heroId: string) {
    this.heroService.removeHero(heroId);
  }
}
