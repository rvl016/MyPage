import { Component, OnInit } from '@angular/core';
import { Brick } from '../share/brick';
import { FeaturedProject } from '../share/featured-project';
import { BrickService } from '../services/brick.service';
import { FeaturedProjectsService } from '../services/featured-projects.service';

@Component({
  selector: 'app-home-component',
  templateUrl: './home-component.component.html',
  styleUrls: ['./home-component.component.scss']
})
export class HomeComponentComponent implements OnInit {

  brick : Brick;
  featuredProject : FeaturedProject;
  constructor( private brickService : BrickService,
    private featuredProjectService : FeaturedProjectsService) { }

  ngOnInit(): void {
    this.brick = this.brickService.getFeaturedBrick();
    this.featuredProject = this.featuredProjectService.getFeaturedProject();
  }

}
