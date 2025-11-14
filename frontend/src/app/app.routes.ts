import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { SetsPageComponent } from './features/sets/sets-page/sets-page.component';
import { CountingPageComponent } from './features/counting/counting-page/counting-page.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'conjuntos', component: SetsPageComponent },
  { path: 'conteo', component: CountingPageComponent },
  { path: '**', redirectTo: '' },
];
