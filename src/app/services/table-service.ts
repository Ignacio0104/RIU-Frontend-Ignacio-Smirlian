import { inject, Injectable, signal } from '@angular/core';
import { Hero, NextOrPrevious } from '../models/hero-models';
import { initalHeroesData } from '../data/hero-data';
import { AppStatusService } from './app-status-service';
import { HeroManagementSerivce } from './hero-management-service';

export interface Pages {
  existPrevPage: boolean;
  existsNextPage: boolean;
  numberOfPages: number;
  currentPage: number;
}

@Injectable({ providedIn: 'root' })
export class TableService {
  heroManagementSvc = inject(HeroManagementSerivce);
  maxRowPerPage = 6;

  private _pagesInformation = signal<Pages>({
    existPrevPage: false,
    existsNextPage: false,
    currentPage: 1,
    numberOfPages: 1,
  });

  readonly pagesInformation = this._pagesInformation.asReadonly();

  private _currentPageInformation = signal<Hero[]>(
    this.heroManagementSvc.heroesList().slice(0, this.maxRowPerPage)
  );
  readonly currentPageInformation = this._currentPageInformation.asReadonly();

  constructor() {
    const heroesLength = this.heroManagementSvc.heroesList().length;
    const numberOfPages = Math.ceil(heroesLength / this.maxRowPerPage);
    this._pagesInformation.set({
      ...this.pagesInformation(),
      numberOfPages,
      existsNextPage: numberOfPages > 1,
    });
  }

  getColumns(): string[] {
    const columns: string[] = [];
    const heroesList = this.heroManagementSvc.heroesList();
    if (heroesList.length > 0) {
      const heroesProperties = Object.keys(heroesList[0]);
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
    let heroesList = this.heroManagementSvc.heroesList();
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
