import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './main-dashboard/landing-page/landing-page.component';
import { EmployeeManagementComponent } from './project-pages/employee-management/employee-management.component';
import { ServiceTicketingComponent } from './project-pages/service-ticketing/service-ticketing.component';

const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path:'employee-management-demo', component: EmployeeManagementComponent },
  { path: 'service-ticketing-demo', component: ServiceTicketingComponent}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
