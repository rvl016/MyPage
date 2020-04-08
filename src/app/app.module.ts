import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { FormsModule } from '@angular/forms';
import { RatingModule } from 'ng-starrating';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing/app-routing.module';

import 'hammerjs';
import { IntroComponent } from './intro/intro.component';
import { IntroDetailComponent } from './intro/intro-detail/intro-detail.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponentComponent } from './home-component/home-component.component';
import { ContactComponent } from './contact/contact.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { GamesComponent } from './games/games.component';
import { SnakeComponent } from './games/snake/snake.component';

import { BrickService } from './services/brick.service';
import { FeaturedProjectsService } from './services/featured-projects.service';
import { GameService } from './services/game.service';
import { MazeSolverComponent } from './games/maze-solver/maze-solver.component';



@NgModule({
  declarations: [
    AppComponent,
    IntroComponent,
    IntroDetailComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponentComponent,
    ContactComponent,
    FeedbackComponent,
    GamesComponent,
    SnakeComponent,
    MazeSolverComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatToolbarModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatButtonModule,
    MatDialogModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    RatingModule,
    ReactiveFormsModule,
    MatSelectModule
  ],
  providers: [
    BrickService, 
    FeaturedProjectsService,
    GameService
  ],
  entryComponents: [
    FeedbackComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
