import { Routes } from '@angular/router';

import { IntroComponent } from '../intro/intro.component';
import { IntroDetailComponent } from '../intro/intro-detail/intro-detail.component';
import { HomeComponentComponent } from '../home-component/home-component.component';
import { GamesComponent } from '../games/games.component';
import { SnakeComponent } from '../games/snake/snake.component';
import { MazeSolverComponent } from '../games/maze-solver/maze-solver.component';
import { ContactComponent } from '../contact/contact.component';

export const routes: Routes = [
  {path: 'home', component: HomeComponentComponent},
  {path: 'contact', component: ContactComponent},
  {path: 'games', component: GamesComponent},
  {path: 'intro', component: IntroComponent},
  {path: 'introdetail/:id', component: IntroDetailComponent},
  {path: 'games/snake', component: SnakeComponent},
  {path: 'games/maze', component: MazeSolverComponent},
  {path: '', redirectTo: '/home', pathMatch: 'full'}
];