import { Component, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-hero-filter',
  imports: [FormsModule, MatFormFieldModule, MatInputModule],
  templateUrl: './hero-filter.html',
  styleUrl: './hero-filter.scss',
})
export class HeroFilter {
  filter: string = '';

  filterUpdated = output<string>();

  onFilter(text: string) {
    this.filterUpdated.emit(text);
  }
}
