import { Component, OnInit } from '@angular/core';
import { CARDS } from './current-cards';
@Component({
  selector: 'app-currentprojects',
  templateUrl: './currentprojects.component.html',
  styleUrls: ['./currentprojects.component.css']
})
export class CurrentprojectsComponent implements OnInit {

  constructor() { }
  currentcards = CARDS
  ngOnInit(): void {
  }

}
