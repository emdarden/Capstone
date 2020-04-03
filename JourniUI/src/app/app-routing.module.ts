import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingComponent } from './components/landing/landing.component';
import { DisplayResultsWrapperComponent } from './components/display-results-wrapper/display-results-wrapper.component';


const routes: Routes = [
  { path: '', component: LandingComponent},
  { path: 'search/:query', component: DisplayResultsWrapperComponent}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
