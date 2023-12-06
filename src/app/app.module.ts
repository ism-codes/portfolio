import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { LandingPageComponent } from './main-dashboard/landing-page/landing-page.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainDashboardComponent } from './main-dashboard/main-dashboard.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainNavigationComponent } from './main-dashboard/main-navigation/main-navigation.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { EmployeeManagementComponent } from './project-pages/employee-management/employee-management.component';
import { ServiceTicketingComponent } from './project-pages/service-ticketing/service-ticketing.component';
import { TrackComponent } from './project-pages/spotify-dashboard/track/track.component';
import { UserProfileComponent } from './project-pages/spotify-dashboard/user-profile/user-profile.component';
import { PlaylistComponent } from './project-pages/spotify-dashboard/playlist/playlist.component';
@NgModule({
  declarations: [	
    AppComponent,
      MainDashboardComponent,
      MainNavigationComponent,
      LandingPageComponent,
      EmployeeManagementComponent,
      ServiceTicketingComponent,
      TrackComponent,
      UserProfileComponent,
      PlaylistComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
