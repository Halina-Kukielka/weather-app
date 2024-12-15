import { Routes } from '@angular/router';
import {StartComponent} from './start/start.component';
import {WeatherComponent} from './weather/weather.component';

export const routes: Routes = [
  { path: '', redirectTo: '/start', pathMatch: 'full' },
  { path: 'start', component: StartComponent },
  { path: 'weather/:city', component: WeatherComponent}
];
