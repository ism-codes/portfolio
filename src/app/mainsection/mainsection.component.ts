import { Component, OnInit } from '@angular/core';
import { ArcGISComponent } from '../projects/arc-gis/arc-gis.component';
import { CARDS } from './featuredcards';
@Component({
  selector: 'app-mainsection',
  templateUrl: './mainsection.component.html',
  styleUrls: ['./mainsection.component.css']
})
export class MainsectionComponent implements OnInit {

  constructor() { }
  featuredcards = CARDS
  ngOnInit(): void {
  }

}
