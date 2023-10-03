import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import {MatTableModule} from '@angular/material/table';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreNavComponent } from './core-components/core-nav/core-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { CardsComponent } from './cards/cards.component';
import {MatCardModule} from '@angular/material/card';
import { CurrentprojectsComponent } from './currentprojects/currentprojects.component';
import { FutureprojectsComponent } from './futureprojects/futureprojects.component';
import { MainsectionComponent } from './mainsection/mainsection.component';
import { PreviousprojectsComponent } from './previousprojects/previousprojects.component';
import { ArcGISComponent } from './projects/arc-gis/arc-gis.component';
import { PlaceFind } from './projects/arc-gis/placefind/placefind.service';
import { PlacefindComponent } from './projects/arc-gis/placefind/placefind.component';
@NgModule({
  declarations: [
    AppComponent,
    CoreNavComponent,
    CardsComponent,
    CurrentprojectsComponent,
    FutureprojectsComponent,
    MainsectionComponent,
    PreviousprojectsComponent,
    PlacefindComponent,
    ArcGISComponent
  ],
  imports: [
    MatTableModule,
    MatCardModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
