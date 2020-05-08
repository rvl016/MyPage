import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FeedbackComponent } from '../feedback/feedback.component';
import { Route } from '../share/route';
import { MainRoutesService } from '../services/main-routes.service';
import { faBars } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {

  routes : Route[];
  breakpointAppBar: boolean;
  faBars : any;

  constructor( public dialog : MatDialog, 
    private routesService : MainRoutesService) {
    this.routes = null;  
    this.faBars = faBars; 
  }

  ngOnInit() : void {
    this.getRoutes();
    this.breakpointAppBar = this.getCollapse( window.innerWidth);
  }

  onResize( event : any) : void {
    this.breakpointAppBar = this.getCollapse( event.target.innerWidth);
  }

  getCollapse( innerWidth : number) : boolean {
    return innerWidth < 740 ? true : false;
  }

  getRoutes() : void {
    this.routes = this.routesService.getRoutes();
  }

  openFeedbackForm() {
    this.dialog.open( FeedbackComponent, { width : '500px'});
  }
}
