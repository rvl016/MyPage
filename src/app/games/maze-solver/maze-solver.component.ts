import { Component, AfterViewInit, ViewChild, HostListener, ElementRef } from '@angular/core';
import * as PIXI from 'pixi.js';
import { AppInterface } from './interface/appInterface';
import * as consts from './definitions/defs';



@Component({
  selector: 'app-maze-solver',
  templateUrl: './maze-solver.component.html',
  styleUrls: ['./maze-solver.component.scss'],
})

export class MazeSolverComponent implements AfterViewInit {

  public pApp : any;
  public container : any;
  public appInterface : AppInterface;
  public pixiParams : Object;
  @ViewChild( 'pixiContainer') pixiContainer;

/*   @HostListener( 'window:keydown', ['$event'])
  keyEvent( event : KeyboardEvent) {
    const key = event.code;
    if (key == "ArrowUp" || key == "ArrowDown" || key == "ArrowLeft" ||
    key == "ArrowRight") {
      event.preventDefault();
      this.appInterface.changeDirection( key);
    }
  } */

  constructor() { 
    this.pixiParams = { width : 600, height : 640, 
      backgroundColor: consts.BACKGROUNDCOL, antialias: true }
  }

  ngAfterViewInit(): void {
    this.pApp = new PIXI.Application( this.pixiParams);
    this.pixiContainer.nativeElement.appendChild( this.pApp.view);
    this.appInterface = new AppInterface( 30, 30, 20, this.pApp);
    this.appInterface.mazeInit();

  }

}
