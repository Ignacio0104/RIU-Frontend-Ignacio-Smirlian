import { Component, effect, inject } from '@angular/core';
import { HeroManagementSerivce } from '../../services/hero-management-service';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Hero, NextOrPrevious } from '../../models/hero-models';
import { HeroImage } from './hero-image/hero-image';
import { HeroCard } from './hero-card/hero-card';
import { HeroList } from '../hero-list/hero-list';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { HeroForm } from '../hero-form/hero-form';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-hero-mangement',
  imports: [HeroCard, HeroList, MatButtonModule, MatDialogModule],
  templateUrl: './hero-mangement.html',
  styleUrl: './hero-mangement.scss',
})
export class HeroMangement {
  readonly dialog = inject(MatDialog);

  private snackBar = inject(MatSnackBar);

  constructor(private heroService: HeroManagementSerivce) {
    effect(() => {
      this.selectedHero = this.heroService.selectedHero();
      this.heroesList = this.heroService.heroesList();
    });
  }

  selectedHero: Hero | null = null;

  heroesList: Hero[] = [];

  ngOnInit() {}

  openFormDialog() {
    const dialogRef = this.dialog.open(HeroForm);

    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.showConfirmation();
        this.heroService.getPaginatedHeroes();
      }
    });
  }

  changeSelectedHero(action: NextOrPrevious) {
    this.heroService.updateSelectedHeroByIndex(action);
  }

  onDeleteHero(heroId: string) {
    this.heroService.removeHero(heroId);
  }

  private showConfirmation(duration: number = 3000) {
    this.snackBar.open('Hero created succesfully!', '', {
      duration: duration,
      horizontalPosition: 'end',
      verticalPosition: 'top',
    });
  }
}
