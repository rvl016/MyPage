import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { StarRatingComponent } from 'ng-starrating';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Feedback, Rating } from '../share/feedback';


@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss']
})
export class FeedbackComponent implements OnInit {

  feedbackForm : FormGroup;
  feedback : Feedback;
  rating = Rating;
  @ViewChild( 'fform') feedbackFormDirective;

  constructor( private fb : FormBuilder) { 
    this.createForm();
  }

  ngOnInit(): void {
  }

  createForm() {
    this.feedbackForm = this.fb.group( {
      name : ['', Validators.required],
      message : '',
      rating : [null , Validators.required]
    });
  }

  onSubmit() {
    this.feedback = this.feedbackForm.value;
    console.log( 'User: ', this.feedback.name);
    this.feedbackForm.reset( {
      name : "",
      message : "",
      rating : null
    });
    this.feedbackFormDirective.resetForm();
  }

/*   onRate($event:{oldValue:number, newValue:number, starRating:StarRatingComponent}) {
    alert(`Old Value:${$event.oldValue}, 
      New Value: ${$event.newValue}, 
      Checked Color: ${$event.starRating.checkedcolor}, 
      Unchecked Color: ${$event.starRating.uncheckedcolor}`);
  } */
}
