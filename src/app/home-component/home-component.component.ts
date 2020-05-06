import { Component, OnInit } from '@angular/core';
import { Brick } from '../share/brick';
import { FeaturedProject } from '../share/featured-project';
import { Presentation, Tech } from '../share/profileDataType';
import { BrickService } from '../services/brick.service';
import { FeaturedProjectsService } from '../services/featured-projects.service';
import { ProfileService } from '../services/profile.service';

@Component({
  selector: 'app-home-component',
  templateUrl: './home-component.component.html',
  styleUrls: ['./home-component.component.scss']
})
export class HomeComponentComponent implements OnInit {

  brick : Brick;
  featuredProject : FeaturedProject;
  presentation : Presentation[];
  progLanguages : Tech[];
  otherLanguages : Tech[];
  framewordsNOtherTech : Tech[];

  constructor( private brickService : BrickService,
    private featuredProjectService : FeaturedProjectsService,
    private profileService : ProfileService) { }

  ngOnInit(): void {
    this.presentation = this.profileService.getPresentation();
    this.progLanguages = this.profileService.getProgLanguages();
    this.otherLanguages = this.profileService.getOtherLanguages();
    this.framewordsNOtherTech = this.profileService.getFrameworksNOther();
  }

}
