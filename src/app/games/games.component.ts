import { Component, OnInit } from '@angular/core';
import { GameService } from '../services/game.service';
import { Game } from '../share/game';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss']
})
export class GamesComponent implements OnInit {

  games : Game[];
  selectedGame : String;
  gameDetail : Game;
  breakpointGridColumns: number;

  constructor( private gameService : GameService, private router : Router,
    private route : ActivatedRoute) {
    this.games = null;
    this.route.queryParamMap.subscribe( params => {
      this.selectedGame = params.get( "selected");
    });
  }

  ngOnInit() : void {
    console.log( this.selectedGame)
    this.games = this.gameService.getGames();
    this.breakpointGridColumns = this.getColsNumber( window.innerWidth);
    this.getGameInfo();
  }

  getGameInfo() : void {
    if (! this.selectedGame) return;
    this.gameDetail = this.games.filter( 
      game => game.selector == this.selectedGame)[0];
  }

  onResize( event : any) : void {
    this.breakpointGridColumns = this.getColsNumber( event.target.innerWidth);
  }


  async selectGame( event : any) : Promise<void> {
    console.log(event)
    console.log(event.currentTarget.id)
    const newParam : Params = { selected: event.currentTarget.id };
    await this.router.navigate(
      [],
      {
        relativeTo: this.route,
        queryParams: newParam
      }
    );
    this.getGameInfo();
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
  

}
