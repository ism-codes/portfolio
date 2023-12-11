import { Component, OnInit } from '@angular/core';
import { CARDS } from './featuredcards';
@Component({
  selector: 'app-portfolio-main',
  templateUrl: './portfolio-main.component.html',
  styleUrls: ['./portfolio-main.component.css']
})
export class PortfolioMainComponent implements OnInit {

  constructor() { }
  featuredcards = CARDS
  ngOnInit(): void {
  }


}
