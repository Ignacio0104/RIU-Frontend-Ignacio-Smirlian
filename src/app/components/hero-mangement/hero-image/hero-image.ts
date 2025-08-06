import { Component, effect, input, signal } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-hero-image',
  imports: [MatProgressSpinnerModule],
  templateUrl: './hero-image.html',
  styleUrl: './hero-image.scss',
})
export class HeroImage {
  heroImage = input<string>();

  isLoading = signal(true);

  constructor() {
    effect(() => {
      const image = this.heroImage();
      if (image) {
        this.isLoading.set(true);
      }
    });
  }

  onImageLoad() {
    this.isLoading.set(false);
  }
}
