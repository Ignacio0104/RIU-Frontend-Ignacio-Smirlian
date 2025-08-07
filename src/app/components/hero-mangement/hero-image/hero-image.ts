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

  imageLoad = signal(false);

  constructor() {
    effect(() => {
      const image = this.heroImage();

      if (image) {
        this.isLoading.set(true);
      }
      setTimeout(() => {
        if (this.isLoading() && !this.imageLoad()) {
          this.isLoading.set(false);
        }
      }, 5000);
    });
  }

  onImageLoad() {
    this.imageLoad.set(true);
    this.isLoading.set(false);
  }
}
