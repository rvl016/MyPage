import { Injectable } from '@angular/core';
import { Presentation, Tech } from '../share/profileDataType';
import { PRESENTATION_DATA, PROG_LANGUAGES, OTHER_LANGUAGES,
  FRAMEWORKS_N_OTHER_TECH } from '../share/profileData';

@Injectable({
  providedIn: 'root'
})

export class ProfileService {

  allTech : Tech[];

  constructor() { 
    this.allTech = PROG_LANGUAGES.concat( OTHER_LANGUAGES).
      concat( FRAMEWORKS_N_OTHER_TECH);
  }

  getPresentation() : Presentation[] {
    return PRESENTATION_DATA;
  }

  getProgLanguages() : Tech[] {
    return PROG_LANGUAGES;
  }

  getOtherLanguages() : Tech[] {
    return OTHER_LANGUAGES;
  }
  getFrameworksNOther() : Tech[] {
    return FRAMEWORKS_N_OTHER_TECH;
  }

  getTechs( names : String[]) : Tech[] {
    return this.allTech.filter( tech => names.includes( tech.title));
  }
}
