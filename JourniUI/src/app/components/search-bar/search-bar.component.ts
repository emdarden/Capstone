/// <reference types="@types/googlemaps" />
import { Component, OnInit } from '@angular/core';
import { MapsAPILoader} from '@agm/core';
import { SearchResultsService } from 'src/app/services/search-results.service';
import { Router } from '@angular/router';
import * as data from '../../../assets/sampledata.json'


@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {

  placeService: any;
  searchResults;
  showMap = false;
  detailService

  sampleData: any = (data as any).default;

  constructor(private mapsAPILoader: MapsAPILoader, private searchResultsService: SearchResultsService, private router: Router) {
    this.mapsAPILoader.load().then(() => {
      this.placeService = new google.maps.places.PlacesService(document.createElement('div'));
    })
   }

  ngOnInit(): void {
  }

 getSearchResults(query){
    var request = {query: "things to do in " + query};

    // const googleSearch = query => {
    //   return new Promise((resolve, reject) => {
    //     this.placeService.textSearch(query, (results, status) => {
    //       if(status === 'OK') {
    //         resolve(results);
    //       } else {
    //         reject(status);
    //       }
    //     })
    //   }).then(results => {
    //     return this.getDetails(results);
    //   }).then(results => {
    //     this.searchResultsService.setSearchResults(results);
    //   })
    // };

    // googleSearch(request)
    
    this.searchResultsService.setSearchResults(this.sampleData);

    console.log(this.sampleData);

    this.navigateToResults(this.showMap);

  }

  navigateToResults(showMap: boolean){
    if(showMap){
      this.router.navigate(['/map-view']);
    } else {
      this.router.navigate(['/card-view']);
    }
  }

  getDetails(results) {

    var details = [];
    var i = 1;

    for(let place of results) {
      setTimeout(() => {
        this.placeService.getDetails({placeId: place.place_id}, (res, status) => {
          if(status === "OK"){
            details.push(res)
          } else {
            console.log(status)
          }
        })
      }, 275 * i)

      i++;
    }
    return details;
    
  }


}
