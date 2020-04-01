import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AgmCoreModule } from '@agm/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingComponent } from './components/landing/landing.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import {environment} from '../environments/environment';
import { SearchResultsComponent } from './components/search-results/search-results.component';
import { CardViewComponent } from './components/card-view/card-view.component';
export const googleAPIKey = environment.googleAPIKey;



@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    SearchBarComponent,
    SearchResultsComponent,
    CardViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AgmCoreModule.forRoot({
      apiKey: googleAPIKey,
      libraries: ["places"]
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
