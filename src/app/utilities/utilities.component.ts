import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-utilities',
  templateUrl: './utilities.component.html',
  styleUrls: ['./utilities.component.scss']
})
export class UtilitiesComponent implements OnInit {

  baseUrl : string;

  constructor() { 
    this.baseUrl = environment.baseUrl;
  }

  ngOnInit(): void {
  }

}
