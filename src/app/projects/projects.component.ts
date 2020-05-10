import { Component, OnInit } from '@angular/core';
import { FeaturedProject } from '../share/featured-project';
import { FeaturedProjectsService } from '../services/featured-projects.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {

  projects : FeaturedProject[];
  breakpointGridColumns: number;

  constructor( private projectService : FeaturedProjectsService, 
    private router : Router) { 
    this.projects = null;
  }

  ngOnInit(): void {
    this.projects = this.projectService.getFeaturedProjects();
    this.breakpointGridColumns = this.getColsNumber( window.innerWidth);
  }


  onResize( event : any) {
    this.breakpointGridColumns = this.getColsNumber( event.target.innerWidth);
  }

  tryProject( route : string) : void {
    this.router.navigateByUrl( route);
  }

  getColsNumber( innerWidth : number) : number {
    if (innerWidth < 800) 
      return 1;
    return 2;
  }
}
