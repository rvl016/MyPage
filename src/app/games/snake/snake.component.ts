import { Component, OnInit, ViewChild, ElementRef, 
  HostListener } from '@angular/core';
  
import { ROWS, COLS, BLOCK_SIZE } from './definitions/defs';
import { Player } from './player/player';

@Component({
  selector: 'app-snake',
  templateUrl: './snake.component.html',
  styleUrls: ['./snake.component.scss']
})

export class SnakeComponent implements OnInit {

  @ViewChild( 'board', { static : true })
  canvas : ElementRef<HTMLCanvasElement>;

  context : CanvasRenderingContext2D;
  score : number;
  highscore : number;
  board : number[][];
  player : Player;
  gameIsRunning : boolean = false;
  innerWidth : number;
  cROWS : number;
  cCOLS : number;
  cBLOCK_SIZE : number;

  constructor() { 
    this.cROWS = ROWS;
    this.cCOLS = COLS;
    this.cBLOCK_SIZE = BLOCK_SIZE;
  }

  @HostListener( 'window:keydown', ['$event'])
  keyEvent( event : KeyboardEvent) {
    const key : String = event.code;
    if (key == "ArrowUp" || key == "ArrowDown" || key == "ArrowLeft" ||
      key == "ArrowRight") {
        event.preventDefault();
        this.player.changeDirection( key);
      }
    if (key == "Space") {
      event.preventDefault();
      this.gameIsRunning = ! this.gameIsRunning;
      this.player.pause();
    }
  }

  @HostListener('window:resize', ['$event'])
    onResize( event) {
    this.innerWidth = window.innerWidth;
  }

  ngOnInit(): void {
    this.innerWidth = window.innerWidth;
/*     this.initBoard(); */
  }

  initBoard() {
  }

  getInitBoard() : number[][] {
    this.context = this.canvas.nativeElement.getContext( '2d');
    this.context.canvas.width = COLS * BLOCK_SIZE;
    this.context.canvas.height = ROWS * BLOCK_SIZE;
    return Array.from( { length : ROWS }, () => Array( COLS).fill( 0));
  }

  OnPlay() {
    this.board = this.getInitBoard();
    this.gameIsRunning = true;
    this.player = new Player( COLS / 2 - 1, ROWS / 2 - 1, this.context, this);
    this.player.start();
  }
}
