import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { FlexLayoutModule } from '@angular/flex-layout';
import { GridModule } from '@angular/flex-layout/grid';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { FormsModule } from '@angular/forms';
import { RatingModule } from 'ng-starrating';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatChipsModule } from '@angular/material/chips';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

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
import { MazeSolverComponent } from './games/maze-solver/maze-solver.component';

import { BrickService } from './services/brick.service';
import { FeaturedProjectsService } from './services/featured-projects.service';
import { GameService } from './services/game.service';
import { ProfileService } from './services/profile.service';
import { ProjectsComponent } from './projects/projects.component';
import { UtilitiesComponent } from './utilities/utilities.component';



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
    MazeSolverComponent,
    ProjectsComponent,
    UtilitiesComponent
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
    MatSelectModule,
    MatChipsModule,
    MatMenuModule, 
    FontAwesomeModule,
    GridModule, 
    MatButtonToggleModule,
    MatTabsModule
  ],
  providers: [
    BrickService, 
    FeaturedProjectsService,
    GameService,
    ProfileService
  ],
  entryComponents: [
    FeedbackComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
