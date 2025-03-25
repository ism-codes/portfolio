import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { BUTTONS } from './buttons';
import { Router } from '@angular/router';
@Component({
  selector: 'app-core-nav',
  templateUrl: './core-nav.component.html',
  styleUrls: ['./core-nav.component.css']
})
export class CoreNavComponent {
  
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
  buttons = BUTTONS
  constructor(private breakpointObserver: BreakpointObserver, public router: Router) {}

}
