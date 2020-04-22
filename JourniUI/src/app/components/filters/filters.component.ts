import { Component, OnInit, Input } from '@angular/core';
import { SearchResultsService } from 'src/app/services/search-results.service';
import { MapsAPILoader } from '@agm/core';
import { stat } from 'fs';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnInit {

  @Input() query
  servicePromise: Promise<void>;
  placeService: google.maps.places.PlacesService;
  location: { lat: number; lng: number; };

  constructor(private searchResultsService: SearchResultsService, private mapsAPILoader: MapsAPILoader) { 
    this.servicePromise = this.mapsAPILoader.load().then(() => {
      this.placeService = new google.maps.places.PlacesService(document.createElement('div'));
    })
  }

  ngOnInit(): void {
    this.servicePromise.then(() => {
      this.placeService.findPlaceFromQuery({query: 'Paris', fields: ['name', 'geometry']}, (results, status) => {
        this.location = {lat: results[0].geometry.location.lat(), lng: results[0].geometry.location.lng()}
      })
    })
  }

  setSelected(selected){
    const request = {query: this.query, type: [selected]}
    console.log(request)
    this.searchResultsService.setSearchResults(request);
  }

}