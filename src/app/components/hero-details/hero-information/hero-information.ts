import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Hero } from '../../../models/hero-models';
import { HeroManagementSerivce } from '../../../services/hero-management-service';
import { HeroCard } from '../../hero-mangement/hero-card/hero-card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-hero-information',
  imports: [HeroCard, MatButtonModule],
  templateUrl: './hero-information.html',
  styleUrl: './hero-information.scss',
})
export class HeroInformation {
  private route = inject(ActivatedRoute);

  private router = inject(Router);

  private heroService = inject(HeroManagementSerivce);

  hero?: Hero;

  ngOnInit() {
    this.fetchHero();
  }

  goToHome() {
    this.router.navigate(['/']);
  }

  async fetchHero() {
    const heroId = this.route.snapshot.paramMap.get('id');
    this.hero = await this.heroService.getHeroById(heroId || '', 0);
    if (!this.hero) {
      this.router.navigate(['/']);
    }
  }
}
