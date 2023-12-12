import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './main-dashboard/landing-page/landing-page.component';
import { EmployeeManagementComponent } from './project-pages/employee-management/employee-management.component';
import { ServiceTicketingComponent } from './project-pages/service-ticketing/service-ticketing.component';
import { SpotifyDashboardComponent } from './project-pages/spotify-dashboard/spotify-dashboard.component';

const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path:'employee-management-demo', component: EmployeeManagementComponent },
  { path: 'spotify-demo', component: SpotifyDashboardComponent}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
