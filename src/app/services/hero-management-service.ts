import { Injectable, signal } from '@angular/core';
import { Hero, NextOrPrevious } from '../models/hero-models';
import { initalHeroesData } from '../data/hero-data';

export interface Pages {
  existPrevPage: boolean;
  existsNextPage: boolean;
  numberOfPages: number;
  currentPage: number;
}

@Injectable({ providedIn: 'root' })
export class HeroManagementSerivce {
  private _heroesList = signal<Hero[]>(initalHeroesData);

  readonly heroesList = this._heroesList.asReadonly();

  private _selectedHero = signal<Hero | null>(initalHeroesData[0]);

  readonly selectedHero = this._selectedHero.asReadonly();

  maxRowPerPage = 6;

  private _pagesInformation = signal<Pages>({
    existPrevPage: false,
    existsNextPage: false,
    currentPage: 1,
    numberOfPages: 1,
  });

  readonly pagesInformation = this._pagesInformation.asReadonly();

  private _currentPageInformation = signal<Hero[]>(
    this.heroesList().slice(0, this.maxRowPerPage)
  );
  readonly currentPageInformation = this._currentPageInformation.asReadonly();

  private _isLoading = signal<boolean>(false);

  readonly isLoading = this._isLoading.asReadonly();

  constructor() {
    const heroesLength = this.heroesList().length;
    const numberOfPages = Math.ceil(heroesLength / this.maxRowPerPage);
    this._pagesInformation.set({
      ...this.pagesInformation(),
      numberOfPages,
      existsNextPage: numberOfPages > 1,
    });
  }

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

  editHero(hero: Hero) {
    this._isLoading.set(true);
    setTimeout(() => {
      const heroIndex = this.heroesList().findIndex(
        (hero) => hero.id === hero.id
      );

      if (heroIndex > -1) {
        const currentHeroList = this.heroesList();

        this._selectedHero.set(hero);

        (currentHeroList[heroIndex] = { ...hero }),
          this._heroesList.set(currentHeroList);
      }
      this._isLoading.set(false);
    }, 3000);
  }

  addNewHero(hero: Hero) {
    this._isLoading.set(true);
    setTimeout(() => {
      this._heroesList.set([
        {
          ...hero,
          id: (this.heroesList().length + 1).toString(),
        },
        ...this.heroesList(),
      ]);
      this._isLoading.set(false);
    }, 3000);
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

  getPaginatedHeroes(pageNumber?: number, filterText?: string) {
    let heroesList = this.heroesList();
    if (filterText) {
      heroesList = heroesList.filter((hero) =>
        hero.name.toLowerCase().includes(filterText.toLowerCase())
      );
    }
    if (heroesList.length < 9) {
      this._pagesInformation.set({
        ...this.pagesInformation(),
        currentPage: 1,
        existPrevPage: false,
        existsNextPage: false,
        numberOfPages: 1,
      });
      this._currentPageInformation.set(heroesList);
    } else if (pageNumber) {
      const startIndex = (pageNumber - 1) * this.maxRowPerPage;
      this._pagesInformation.set({
        ...this.pagesInformation(),
        currentPage: pageNumber,
        existPrevPage: pageNumber > 1,
        existsNextPage: startIndex + this.maxRowPerPage < heroesList.length,
      });

      this._currentPageInformation.set(
        heroesList.slice(startIndex, startIndex + this.maxRowPerPage)
      );
    } else {
      this._pagesInformation.set({
        ...this.pagesInformation(),
        currentPage: 1,
        existPrevPage: false,
        existsNextPage: heroesList.length > this.maxRowPerPage,
      });
      this._currentPageInformation.set(heroesList.slice(0, this.maxRowPerPage));
    }
  }
}
