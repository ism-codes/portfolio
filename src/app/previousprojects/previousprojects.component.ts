import { Component, OnInit } from '@angular/core';
import { PreviousCardLayout } from './cardformat-previous';
import { CARDS } from './previouscards';
@Component({
  selector: 'app-previousprojects',
  templateUrl: './previousprojects.component.html',
  styleUrls: ['./previousprojects.component.css']
})
export class PreviousprojectsComponent implements OnInit {

  constructor() { }
  previouscards = CARDS
  ngOnInit(): void {
  }

}
