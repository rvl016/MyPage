import { Injectable } from '@angular/core';
import { FeaturedProject } from '../share/featured-project';
import { FEATUREDPROJECTS } from '../share/featured-projects';

@Injectable({
  providedIn: 'root'
})
export class FeaturedProjectsService {

  constructor() { }

  getFeaturedProjects() : FeaturedProject[] {
    return FEATUREDPROJECTS;
  }

  getFeaturedProject( ) : FeaturedProject {
    return FEATUREDPROJECTS.filter((project) => { project.id == 0 })[0];
  }


}
