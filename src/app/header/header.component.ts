import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FeedbackComponent } from '../feedback/feedback.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor( public dialog : MatDialog) { }

  ngOnInit(): void {
  }

  openFeedbackForm() {
    this.dialog.open( FeedbackComponent, { width : '500px'});
  }
}
