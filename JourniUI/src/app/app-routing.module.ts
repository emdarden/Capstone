import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { CallbackComponent } from './components/callback/callback.component';
import { DisplayResultsWrapperComponent } from './components/display-results-wrapper/display-results-wrapper.component';
import { DisplayTripComponent } from './components/display-trip/display-trip.component';
import { DisplayTripsComponent } from './components/display-trips/display-trips.component';
import { LandingComponent } from './components/landing/landing.component';
import { InterceptorService } from './services/interceptor.service';

const routes: Routes = [
  { path: '', component: LandingComponent},
  { path: 'search', component: DisplayResultsWrapperComponent},
  { path: 'trips', component: DisplayTripsComponent, canActivate: [AuthGuard]},
  { path: 'callback', component: CallbackComponent},
  { path: 'trips/:id' , component: DisplayTripComponent, canActivate: [AuthGuard]}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true
    }
  ]
})
export class AppRoutingModule { }
