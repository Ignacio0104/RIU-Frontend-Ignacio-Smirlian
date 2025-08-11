import { Component, effect, inject, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { HeroManagementSerivce } from '../../../services/hero-management.service';
import { Hero, NextOrPrevious } from '../../../models/hero-models';
import { MatButtonModule } from '@angular/material/button';
import { HeroFilter } from '../hero-filter/hero-filter';
import { Pages, TableService } from '../../../services/table.service';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfirmDelete } from '../confirm-delete/confirm-delete';

@Component({
  selector: 'app-hero-list',
  imports: [MatTableModule, MatButtonModule, HeroFilter, MatIconModule],
  templateUrl: './hero-list.html',
  styleUrl: './hero-list.scss',
})
export class HeroList implements OnInit {
  private heroService = inject(HeroManagementSerivce);

  private tableService = inject(TableService);

  private dialog = inject(MatDialog);

  columns: string[] = [];

  heroesData: Hero[] = [];

  pageInformation!: Pages;

  filterText: string = '';

  readonly NextOrPrevious = NextOrPrevious;

  constructor() {
    effect(() => {
      this.heroesData = this.tableService.currentPageInformation();
      this.pageInformation = this.tableService.pagesInformation();
    });
  }

  ngOnInit() {
    this.columns = this.tableService.getColumns();
  }

  clickedCell(row: Hero) {
    if (row.id) {
      this.heroService.updateSelectedHeroById(row.id);
    }
  }

  handleFilter(filterText: string) {
    this.filterText = filterText;
    this.tableService.getPaginatedHeroes(undefined, filterText);
  }

  showConfirmation(hero: Hero) {
    const dialogRef = this.dialog.open(ConfirmDelete, {
      width: '300px',
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.heroService.removeHero(hero.id || '');
        this.tableService.getPaginatedHeroes(
          this.pageInformation.currentPage,
          this.filterText
        );
      }
    });
  }

  handlePagination(event: NextOrPrevious) {
    const currentPage = this.pageInformation.currentPage;
    const pageToFetch =
      event === NextOrPrevious.NEXT ? currentPage + 1 : currentPage - 1;
    this.tableService.getPaginatedHeroes(pageToFetch, this.filterText);
  }
}
