import { Routes } from '@angular/router';

import { IntroComponent } from '../intro/intro.component';
import { IntroDetailComponent } from '../intro/intro-detail/intro-detail.component';
import { HomeComponentComponent } from '../home-component/home-component.component';
import { GamesComponent } from '../games/games.component';
import { SnakeComponent } from '../games/snake/snake.component';
import { MazeSolverComponent } from '../games/maze-solver/maze-solver.component';
import { ContactComponent } from '../contact/contact.component';
import { ProjectsComponent } from '../projects/projects.component';
import { UtilitiesComponent } from '../utilities/utilities.component';

export const routes: Routes = [
  {path: 'home', component: HomeComponentComponent},
  {path: 'contact', component: ContactComponent},
  {path: 'projects', component: ProjectsComponent},
  {path: 'games', component: GamesComponent},
  {path: 'known-tech', component: IntroComponent},
  {path: 'utilities', component: UtilitiesComponent},
  {path: '', redirectTo: '/home', pathMatch: 'full'}
];