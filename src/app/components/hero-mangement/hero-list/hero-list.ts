import { Component, effect } from '@angular/core';
import { MatRow, MatTableModule } from '@angular/material/table';
import {
  HeroManagementSerivce,
  Pages,
} from '../../../services/hero-management-service';
import { Hero, NextOrPrevious } from '../../../models/hero-models';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-hero-list',
  imports: [MatTableModule, MatButtonModule],
  templateUrl: './hero-list.html',
  styleUrl: './hero-list.scss',
})
export class HeroList {
  columns: string[] = [];

  heroesData: Hero[] = [];

  pageInformation!: Pages;

  readonly NextOrPrevious = NextOrPrevious;

  constructor(private heroService: HeroManagementSerivce) {
    effect(() => {
      this.heroesData = this.heroService.currentPageInformation();
      this.pageInformation = this.heroService.pagesInformation();
    });
  }

  ngOnInit() {
    this.columns = this.heroService.getColumns();
  }

  clickedCell(row: Hero) {
    if (row.id) {
      this.heroService.updateSelectedHeroById(row.id);
    }
  }

  handlePagination(event: NextOrPrevious) {
    const currentPage = this.pageInformation.currentPage;
    const pageToFetch =
      event == NextOrPrevious.NEXT ? currentPage + 1 : currentPage - 1;
    this.heroService.getPaginatedHeroes(pageToFetch);
  }
}
