import { Component, OnInit } from '@angular/core';

export interface TabTest{
  label: string;
  content: Component;
}

@Component({
  selector: 'app-tab-groups',
  templateUrl: './tab-groups.component.html',
  styleUrls: ['./tab-groups.component.css']
  
})

export class TabGroupsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
