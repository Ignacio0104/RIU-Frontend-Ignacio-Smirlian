import { Injectable, signal } from '@angular/core';
import { Hero, NextOrPreviousHero } from '../models/hero-models';
import { initalHeroesData } from '../data/hero-data';

@Injectable({ providedIn: 'root' })
export class HeroManagementSerivce {
  private _herosList = signal<Hero[]>(initalHeroesData);

  readonly herosList = this._herosList.asReadonly();

  private _selectedHero = signal<Hero | null>(initalHeroesData[0]);

  readonly selectedHero = this._selectedHero.asReadonly();

  //   readonly user = this._user.asReadonly();

  //   readonly isLoggedIn = computed(() => !!this._user());

  //   login(user: User) {
  //     this._user.set(user);
  //   }

  //   logout() {
  //     this._user.set(null);
  //   }

  updateSelectedHeroByIndex(direction: NextOrPreviousHero) {
    const currentIndex = this.herosList().findIndex(
      (hero) => hero.id === this.selectedHero()?.id
    );
    if (currentIndex > -1) {
      if (
        direction === NextOrPreviousHero.NEXT &&
        currentIndex + 1 < this.herosList().length
      ) {
        this._selectedHero.set(this.herosList()[currentIndex + 1]);
      }
      if (direction === NextOrPreviousHero.PREVIOUS && currentIndex - 1 >= 0) {
        this._selectedHero.set(this.herosList()[currentIndex - 1]);
      }
    }

    console.log(this.selectedHero());
  }

  removeHero(heroid: string) {
    const currentList = this._herosList();
    if (currentList) {
      this._herosList.set(currentList.filter((hero) => hero.id !== heroid));
    }
  }
}
