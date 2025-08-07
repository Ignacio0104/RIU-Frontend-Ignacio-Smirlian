import { Routes } from '@angular/router';
import { HeroMangement } from './components/hero-mangement/hero-mangement';
import { HeroInformation } from './components/hero-details/hero-information/hero-information';

export const routes: Routes = [
  { path: '', component: HeroMangement },
  { path: 'hero/:id', component: HeroInformation },
];
