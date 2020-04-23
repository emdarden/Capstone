import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
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
import { CallbackComponent } from './components/callback/callback.component';
import { FiltersComponent } from './components/filters/filters.component';
import { SavePlaceComponent } from './components/save-place/save-place.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { DisplayTripComponent } from './components/display-trip/display-trip.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { DragPlaceComponent } from './components/drag-place/drag-place.component';

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
    ProfileComponent, 
    DisplayTripsComponent, 
    HeaderComponent, 
    CreateTripComponent, 
    SavePlaceComponent, 
    DisplayTripComponent, 
    DragPlaceComponent,
    FiltersComponent, 
    CallbackComponent
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
    FormsModule,
    DragDropModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent],
  entryComponents: [
    CreateTripComponent,
    SavePlaceComponent
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }
