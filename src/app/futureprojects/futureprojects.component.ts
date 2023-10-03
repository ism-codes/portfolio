import { Component, OnInit } from '@angular/core';
import { FUTURE } from './futureprojects';
import { FutureFormat } from "./futureprojects-format";
import {animate, state, style, transition, trigger} from '@angular/animations';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {NgForOf, NgIf} from '@angular/common';
import {MatTableModule} from '@angular/material/table';
@Component({
  selector: 'app-futureprojects',
  templateUrl: './futureprojects.component.html',
  styleUrls: ['./futureprojects.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class FutureprojectsComponent implements OnInit {

  constructor() { 

  }
  FutureData = FUTURE
  columnsToDisplay = ['ProjectID', 'Name'];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  expandedProjects!: FutureFormat | null;
  ngOnInit(): void {
  }

}
