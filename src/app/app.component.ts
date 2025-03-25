import { Component } from '@angular/core';
import { CoreNavComponent } from './core-components/core-nav/core-nav.component';
import { TraveldemoComponent } from './projects/traveldemo/traveldemo.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Ismael Khan Portfolio';
  shownCore = true
}
