import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingComponent } from './components/landing/landing.component';
import { CardViewComponent } from './components/card-view/card-view.component';


const routes: Routes = [
  { path: '', component: LandingComponent},
  { path: 'card-view', component: CardViewComponent}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
