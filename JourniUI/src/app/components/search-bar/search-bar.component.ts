/// <reference types="@types/googlemaps" />
import { Component, OnInit } from '@angular/core';
import { MapsAPILoader} from '@agm/core';




@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {

  placeService: any;
  searchResults;


  constructor(private mapsAPILoader: MapsAPILoader) {
    this.mapsAPILoader.load().then(() => {
      this.placeService = new google.maps.places.PlacesService(document.createElement('div'));

    })
   }

  ngOnInit(): void {
  }

  async callGoogleAPI(query){
    var request = {query: "things to do in " + query};

   const googleSearch = query => {
     return new Promise((resolve, reject) => {
       this.placeService.textSearch(query, (results, status) => {
         if(status === 'OK') {
           resolve(results);
         } else {
           reject(status);
         }
       });
     });
   };
    
    this.searchResults = await googleSearch(request);

    // console.log(this.searchResults)

  }

}
