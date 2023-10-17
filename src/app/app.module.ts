import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import {MatTableModule} from '@angular/material/table';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
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
import { TabGroupsComponent } from './projects/arc-gis/tab-groups/tab-groups.component';
import {MatTabsModule} from '@angular/material/tabs';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import { MatSortModule } from '@angular/material/sort';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MongoTestingComponent } from './mongo-testing/mongo-testing.component';
import { TraveldemoComponent } from './projects/traveldemo/traveldemo.component';
import { MytravelComponent } from './projects/traveldemo/mytravel/mytravel.component';
import { NewtravelComponent } from './projects/traveldemo/newtravel/newtravel.component';
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
    ArcGISComponent,
    TabGroupsComponent,
    MongoTestingComponent,
    TraveldemoComponent,
    MytravelComponent,
    NewtravelComponent
  ],
  imports: [
    MatSortModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatExpansionModule,
    MatTabsModule,
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
