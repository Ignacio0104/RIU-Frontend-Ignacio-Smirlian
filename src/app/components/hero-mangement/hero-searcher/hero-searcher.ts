import { Component, effect, inject, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { HeroManagementSerivce } from '../../../services/hero-management.service';
import { Hero } from '../../../models/hero-models';
import { Router, RouterModule } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppStatusService } from '../../../services/app-status.service';

@Component({
  selector: 'app-hero-searcher',
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatProgressSpinner,
    RouterModule,
  ],
  templateUrl: './hero-searcher.html',
  styleUrl: './hero-searcher.scss',
})
export class HeroSearcher {
  private snackBar = inject(MatSnackBar);

  heroService = inject(HeroManagementSerivce);
  appStatusSvc = inject(AppStatusService);

  router = inject(Router);

  isLoading = false;

  heroFound?: Hero;

  heroNotFound = false;

  constructor() {
    effect(() => {
      this.isLoading = this.appStatusSvc.isLoading();
    });
  }

  async searchHero(id: string) {
    this.heroFound = await this.heroService.getHeroById(id);
    if (!this.heroFound) {
      this.showNotFoundMessage();
    } else {
      this.heroService.updateSelectedHeroById(this.heroFound.id);
      this.router.navigate(['/hero', id]);
    }
  }

  private showNotFoundMessage(duration: number = 11000) {
    this.snackBar.open('Hero not found!', '', {
      duration: duration,
      horizontalPosition: 'end',
      verticalPosition: 'bottom',
    });
  }
}
