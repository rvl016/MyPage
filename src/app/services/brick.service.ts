import { Injectable } from '@angular/core';
import { Brick } from '../share/brick';
import { BRICKS } from '../share/bricks';

@Injectable({
  providedIn: 'root'
})
export class BrickService {

  constructor() { }

  getBricks() : Brick[] {
    return BRICKS;
  }

  getBrick( id : string) : Brick {
    return BRICKS.filter( (brick) => ( brick.id == id ))[0];
  }

  getFeaturedBrick() : Brick {
    return BRICKS.filter( (brick) => brick.featured)[0];
  }
}
