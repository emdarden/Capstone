/// <reference types="@types/googlemaps" />
import { Component, OnInit } from '@angular/core';
import { MapsAPILoader} from '@agm/core';
import { Observable } from 'rxjs';



@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {

  placeService: any;
  query$: Observable<string>;
  query: string;

  constructor(private mapsAPILoader: MapsAPILoader) {
    this.mapsAPILoader.load().then(() => {
      this.placeService = new google.maps.places.PlacesService(document.createElement('div'));

    })
   }

  ngOnInit(): void {
    this.query$.subscribe(query => this.query = query)
  }

  callGoogleAPI(query){
    var request = {query: "things to do in " + query}
   

    this.placeService.textSearch(request, function(results, status, pagination){
      console.log(results);
    });
    
    // this.placeService = new google.maps.places.PlacesService(map);
  }

}
