import { MapsAPILoader } from '@agm/core';
import { Component, Input, OnInit } from '@angular/core';
import { MapsService } from 'src/app/services/maps.service';
import { SearchResultsService } from 'src/app/services/search-results.service';

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

  constructor(private searchResultsService: SearchResultsService, private mapsAPILoader: MapsAPILoader, private mapsService: MapsService) { 
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
    var request;

    if(selected === 'all'){
      request = {query: "things to do in " + this.query}
    } else {
      request = {query: this.query, type: [selected]}
    }

    this.mapsService.removeMarkers()
    this.searchResultsService.setSearchResults(request);
  }

}
