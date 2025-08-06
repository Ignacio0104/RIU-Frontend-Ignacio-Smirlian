import { Injectable, signal } from '@angular/core';
import { Hero, NextOrPreviousHero } from '../models/hero-models';
import { initalHeroesData } from '../data/hero-data';

@Injectable({ providedIn: 'root' })
export class HeroManagementSerivce {
  private _heroesList = signal<Hero[]>(initalHeroesData);

  readonly heroesList = this._heroesList.asReadonly();

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
    const currentIndex = this.heroesList().findIndex(
      (hero) => hero.id === this.selectedHero()?.id
    );
    if (currentIndex > -1) {
      if (
        direction === NextOrPreviousHero.NEXT &&
        currentIndex + 1 < this.heroesList().length
      ) {
        this._selectedHero.set(this.heroesList()[currentIndex + 1]);
      }
      if (direction === NextOrPreviousHero.PREVIOUS && currentIndex - 1 >= 0) {
        this._selectedHero.set(this.heroesList()[currentIndex - 1]);
      }
    }

    console.log(this.selectedHero());
  }

  removeHero(heroid: string) {
    const currentList = this._heroesList();
    if (currentList) {
      this._heroesList.set(currentList.filter((hero) => hero.id !== heroid));
    }
  }

  getColumns(): string[] {
    const columns: string[] = [];
    if (this._heroesList().length > 0) {
      const heroesProperties = Object.keys(this._heroesList()[0]);
      heroesProperties.forEach((property) => {
        if (
          !property.includes('description') &&
          !property.includes('pictureUrl')
        ) {
          columns.push(property);
        }
      });
    }
    return columns;
  }
}
