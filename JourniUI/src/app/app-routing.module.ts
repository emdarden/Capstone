import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingComponent } from './components/landing/landing.component';
import { DisplayResultsWrapperComponent } from './components/display-results-wrapper/display-results-wrapper.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AuthGuard } from './auth.guard';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { InterceptorService } from './services/interceptor.service';
import { DisplayTripsComponent } from './components/display-trips/display-trips.component';
import { CallbackComponent } from './components/callback/callback.component';
import { DisplayTripComponent } from './components/display-trip/display-trip.component';

const routes: Routes = [
  { path: '', component: LandingComponent},
  { path: 'search', component: DisplayResultsWrapperComponent},
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
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
