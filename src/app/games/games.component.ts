import { Component, OnInit } from '@angular/core';
import { GameService } from '../services/game.service';
import { Game } from '../share/game';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss']
})
export class GamesComponent implements OnInit {

  games : Game[];
  selectedGame : Game;

  constructor( private gameService : GameService) {
    this.games = null;
    this.selectedGame = null;
  }

  onSelect( game : Game) {
    this.selectedGame = game;
  }

  ngOnInit(): void {
    this.games = this.gameService.getGames();
  }

}
