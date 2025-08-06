import { Component } from '@angular/core';
import { MatRow, MatTableModule } from '@angular/material/table';
import { HeroManagementSerivce } from '../../services/hero-management-service';
import { Hero } from '../../models/hero-models';

@Component({
  selector: 'app-hero-list',
  imports: [MatTableModule],
  templateUrl: './hero-list.html',
  styleUrl: './hero-list.scss',
})
export class HeroList {
  columns: string[] = [];

  heroesData: Hero[] = [];

  constructor(private heroService: HeroManagementSerivce) {}

  ngOnInit() {
    this.columns = this.heroService.getColumns();
    this.heroesData = this.heroService.heroesList();

    console.log(this.columns);
    console.log(this.heroesData);
  }

  clickedCell(row: MatRow) {
    console.log(row);
  }
}
