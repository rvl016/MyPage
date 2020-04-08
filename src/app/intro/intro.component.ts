import { Component, OnInit } from '@angular/core';
import { Brick } from '../share/brick';
import { BrickService } from '../services/brick.service';


@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.scss']
})

export class IntroComponent implements OnInit {
  bricks: Brick[];
  selectedBrick: Brick;

  onSelect( brick : Brick) {
    this.selectedBrick = brick;
  }

  constructor( private brickService : BrickService) { 
    this.bricks = null;
    this.selectedBrick = null;
  }

  ngOnInit(): void {
    this.bricks = this.brickService.getBricks();
  }

}
