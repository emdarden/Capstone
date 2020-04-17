import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AgmCoreModule } from '@agm/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingComponent } from './components/landing/landing.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { environment } from '../environments/environment';
import { SearchResultsComponent } from './components/search-results/search-results.component';
import { CardComponent } from './components/card/card.component';
import { DisplayResultsWrapperComponent } from './components/display-results-wrapper/display-results-wrapper.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NavComponent } from './components/nav/nav.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { PlaceDetailComponent } from './components/place-detail/place-detail.component'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProfileComponent } from './components/profile/profile.component';
import { DisplayTripsComponent } from './components/display-trips/display-trips.component';
import { HeaderComponent } from './components/header/header.component';
import { CreateTripComponent } from './components/create-trip/create-trip.component';
import { AuthService } from './services/auth.service';
import { SavePlaceComponent } from './components/save-place/save-place.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

export const googleAPIKey = environment.googleAPIKey;



@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    SearchBarComponent,
    SearchResultsComponent,
    CardComponent, 
    DisplayResultsWrapperComponent, 
    NavComponent, 
    PlaceDetailComponent, 
    ProfileComponent, DisplayTripsComponent, HeaderComponent, CreateTripComponent, SavePlaceComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AgmCoreModule.forRoot({
      apiKey: googleAPIKey,
      libraries: ["places"]
    }),
    FontAwesomeModule,
    GoogleMapsModule,
    NgbModule,
    BrowserAnimationsModule,
    FormsModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent],
  entryComponents: [
    CreateTripComponent,
    SavePlaceComponent
  ]
})
export class AppModule { }
