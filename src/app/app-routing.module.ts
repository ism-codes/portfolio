import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainsectionComponent } from './mainsection/mainsection.component';
import { PreviousprojectsComponent } from './previousprojects/previousprojects.component';
import { CurrentprojectsComponent } from './currentprojects/currentprojects.component';
import { FutureprojectsComponent } from './futureprojects/futureprojects.component';
const routes: Routes = [
  {path: '', component: MainsectionComponent},
  {path: 'previous-projects', component: PreviousprojectsComponent},
  {path: 'current-projects', component: CurrentprojectsComponent},
  {path: 'future-projects', component: FutureprojectsComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

 }
