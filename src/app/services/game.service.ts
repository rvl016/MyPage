import { Injectable } from '@angular/core';
import { Game } from './../share/game';
import { GAMES } from './../share/games';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor() {}

  getGame( name : String) : Game {
    return GAMES.filter( ( game) => (game.name == name) )[0];
  }

  getGames() : Game[] {
    return GAMES;
  }

}
