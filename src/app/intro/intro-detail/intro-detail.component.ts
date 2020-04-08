import { Component, OnInit, Input } from '@angular/core';
import { Brick } from '../../share/brick';
import { BrickService } from '../../services/brick.service';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-intro-detail',
  templateUrl: './intro-detail.component.html',
  styleUrls: ['./intro-detail.component.scss']
})

export class IntroDetailComponent implements OnInit {

  brick : Brick;

  constructor( private brickService : BrickService, 
    private location : Location,
    private route : ActivatedRoute) { 
  }

  ngOnInit() : void {
      const id = this.route.snapshot.params['id'];
      this.brick = this.brickService.getBrick( id);
  }

  goBack() : void {
      this.location.back();
  }

}
