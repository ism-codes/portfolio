import { Component, OnInit,HostListener } from '@angular/core';
import { SUBPAGES } from './SubPageList';
import { Router } from '@angular/router';
@Component({
  selector: 'app-portfolio-nav',
  templateUrl: './portfolio-nav.component.html',
  styleUrls: ['./portfolio-nav.component.css']
})

export class PortfolioNavComponent implements OnInit {
  subpageList = SUBPAGES
  currentWindowWidth= window.innerWidth;
  constructor(public router: Router) { }
  @HostListener('window:resize')
    onResize() {
      this.currentWindowWidth = window.innerWidth
      console.log(this.currentWindowWidth)
    }
  ngOnInit(): void {
    this.currentWindowWidth = window.innerWidth;
  }
 
}
