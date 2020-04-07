import { Component, OnInit } from '@angular/core';
import { SearchResultsService } from 'src/app/services/search-results.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Observable, Subscription } from 'rxjs';
import { MapsAPILoader } from '@agm/core';
import { MapsService } from 'src/app/services/maps.service';

@Component({
  selector: 'app-display-results-wrapper',
  templateUrl: './display-results-wrapper.component.html',
  styleUrls: ['./display-results-wrapper.component.scss']
})
export class DisplayResultsWrapperComponent implements OnInit {
  searchResult$: Subscription;
  searchResults;
  mapCenter$: Subscription;
  mapCenter = {lat: 48.856614, lng: 2.3522219};

  searchSubscription: Subscription;
  query: string;
  request;
  map;
  placeService

  showMap = true;

  constructor( 
    private route: ActivatedRoute,
    private service: SearchResultsService,
    private mapsService: MapsService,
    private mapsAPILoader: MapsAPILoader) { 
     this.mapsAPILoader.load().then(() => {
       this.map = new google.maps.Map(document.getElementById('map'), {zoom: 12, center: {lat: 0, lng: 0}})
       console.log(this.map)

     })
    }

  ngOnInit(): void {
    
    this.searchResult$ = this.route.paramMap.subscribe((param) => {
      this.query = param.get('query');
      this.request = {query: "things to do in " + this.query}
      this.service.setSearchResults(this.request);
      this.service.setMapCenter(this.query);
    })

    this.searchSubscription = this.service.getSearchResults().subscribe(results => {
      this.searchResults = results;
    })

    this.mapCenter$ = this.service.getMapCenter().subscribe(results => {
      this.mapCenter = results;
      console.log(this.mapCenter);
      this.map.setCenter(this.mapCenter)
      this.mapsService.setMap(this.map)
    })

  }

}
