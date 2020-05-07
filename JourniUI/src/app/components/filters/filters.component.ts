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
  radius;

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

  clear(){
    (<HTMLInputElement>document.getElementById('center')).value = null;
    var request = {query: "things to do in " + this.query}

    this.mapsService.removeMarkers()
    this.searchResultsService.setSearchResults(request);
  }

  search(center){
    var request; 
    this.mapsService.removeMarkers()

    console.log(center)
    console.log(parseInt(this.radius))

    this.servicePromise.then(() => {
      this.placeService.findPlaceFromQuery({query: center, fields: ['name', 'geometry']}, (results, status) => {
        const location = {lat: results[0].geometry.location.lat(), lng: results[0].geometry.location.lng()}
        console.log(location)

        request = {query: "things to do in " + this.query, location: location, radius: (parseInt(this.radius) * 1000)}
        this.searchResultsService.setSearchResults(request)

        console.log(status)
      })
    })
  }

  

}
