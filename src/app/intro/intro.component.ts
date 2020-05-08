import { Component, OnInit } from '@angular/core';
import { Brick } from '../share/brick';
import { BrickService } from '../services/brick.service';
import { Tech } from '../share/profileDataType';
import { ProfileService } from '../services/profile.service'


@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.scss']
})

export class IntroComponent implements OnInit {
  bricks : Brick[];
  selectedBrick : Brick;
  progLanguages : Tech[];
  otherLanguages : Tech[];
  frameworksNOtherLanguages : Tech[];
  selectedIndex: number;
  breakpointGridColumns: number;

  constructor( private brickService : BrickService, 
    private profileService : ProfileService) { 
    this.bricks = null;
    this.selectedBrick = null;
    this.progLanguages = null;
    this.otherLanguages = null;
    this.frameworksNOtherLanguages = null;
  }

  ngOnInit(): void {
    this.bricks = this.brickService.getBricks();
    this.progLanguages = this.profileService.getProgLanguages();
    this.otherLanguages = this.profileService.getOtherLanguages();
    this.frameworksNOtherLanguages = this.profileService.getFrameworksNOther();
    this.breakpointGridColumns = this.getColsNumber( window.innerWidth);
  }

  getColsNumber( innerWidth : number) : number {
    if (innerWidth < 450) 
      return 1;
    if (innerWidth < 650) 
      return 2;
    if (innerWidth < 800) 
      return 3;
    return 4;
  }

  onSelect( index : number) {
    this.selectedIndex = index;
  }

  onResize( event : any) {
    this.breakpointGridColumns = this.getColsNumber( event.target.innerWidth);
  }



}
