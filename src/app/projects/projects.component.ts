import { Component, OnInit } from '@angular/core';
import { FeaturedProject } from '../share/featured-project';
import { FeaturedProjectsService } from '../services/featured-projects.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {

  projects : FeaturedProject[];
  breakpointGridColumns: number;

  constructor( private projectService : FeaturedProjectsService) { 
    this.projects = null;
  }

  ngOnInit(): void {
    this.projects = this.projectService.getFeaturedProjects();
    this.breakpointGridColumns = this.getColsNumber( window.innerWidth);
  }


  onResize( event : any) {
    this.breakpointGridColumns = this.getColsNumber( event.target.innerWidth);
  }

  getColsNumber( innerWidth : number) : number {
    if (innerWidth < 900) 
      return 1;
    return 2;
  }
}
