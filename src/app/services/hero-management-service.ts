import { inject, Injectable, signal } from '@angular/core';
import { Hero, NextOrPrevious } from '../models/hero-models';
import { initalHeroesData } from '../data/hero-data';
import { AppStatusService } from './app-status-service';

export interface Pages {
  existPrevPage: boolean;
  existsNextPage: boolean;
  numberOfPages: number;
  currentPage: number;
}

@Injectable({ providedIn: 'root' })
export class HeroManagementSerivce {
  private appStatusSvc = inject(AppStatusService);

  private _heroesList = signal<Hero[]>(initalHeroesData);

  readonly heroesList = this._heroesList.asReadonly();

  private _selectedHero = signal<Hero | null>(initalHeroesData[0]);

  readonly selectedHero = this._selectedHero.asReadonly();

  maxRowPerPage = 6;

  updateSelectedHeroByIndex(direction: NextOrPrevious) {
    const currentIndex = this.heroesList().findIndex(
      (hero) => hero.id === this.selectedHero()?.id
    );
    if (currentIndex > -1) {
      if (
        direction === NextOrPrevious.NEXT &&
        currentIndex + 1 < this.heroesList().length
      ) {
        this._selectedHero.set(this.heroesList()[currentIndex + 1]);
      }
      if (direction === NextOrPrevious.PREVIOUS && currentIndex - 1 >= 0) {
        this._selectedHero.set(this.heroesList()[currentIndex - 1]);
      }
    }
  }

  updateSelectedHeroById(id: string) {
    const newHeroIndex = this.heroesList().findIndex((hero) => hero.id === id);

    if (newHeroIndex > -1) {
      this._selectedHero.set(this.heroesList()[newHeroIndex]);
    }
  }

  getHeroById(id: string, delay = 2000): Promise<Hero | undefined> {
    this.appStatusSvc.updateLoadingStatus(true);
    return new Promise((resolve) => {
      setTimeout(() => {
        this.appStatusSvc.updateLoadingStatus(false);
        const hero = this.heroesList().find((h) => h.id === id);
        resolve(hero);
      }, delay);
    });
  }

  editHero(hero: Hero) {
    this.appStatusSvc.updateLoadingStatus(true);
    const currentHeroList = this.heroesList();
    setTimeout(() => {
      const heroIndex = currentHeroList.findIndex(
        (heroItem) => heroItem.id === hero.id
      );

      if (heroIndex > -1) {
        const currentHeroList = this.heroesList();

        this._selectedHero.set(hero);

        (currentHeroList[heroIndex] = {
          ...hero,
          id: currentHeroList[heroIndex].id,
        }),
          this._heroesList.set(currentHeroList);
      }
      this.appStatusSvc.updateLoadingStatus(false);
    }, 3000);
  }

  addNewHero(hero: Hero) {
    this.appStatusSvc.updateLoadingStatus(true);
    setTimeout(() => {
      this._heroesList.set([
        {
          ...hero,
          id: (this.heroesList().length + 1).toString(),
        },
        ...this.heroesList(),
      ]);
      this.appStatusSvc.updateLoadingStatus(false);
    }, 3000);
  }

  removeHero(heroid: string) {
    const currentList = this._heroesList();
    if (this.selectedHero()?.id === heroid) {
      this._selectedHero.set(null);
    }
    if (currentList) {
      this._heroesList.set(currentList.filter((hero) => hero.id !== heroid));
    }
  }
}
