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
export class DisplayResultsWrapperComponent implements OnInit{
  searchResult$: Subscription;
  searchResults;
  searchSubscription: Subscription;
  query: string;
  request;
  placeService

  showMapBool = false;

  constructor( 
    private route: ActivatedRoute,
    private service: SearchResultsService,
    private mapsService: MapsService) { 
    }

  ngOnInit(): void {

    this.mapsService.initMap(document.getElementById('map'));

    this.mapsService.getMapStatus().subscribe(res => {
      if(res){
        this.showMapBool = true;
        this.mapsService.refreshMap();
      } else {
        this.showMapBool = false;
      }
    })
    
    
    this.searchResult$ = this.route.paramMap.subscribe((param) => {
      this.query = param.get('query');
      this.request = {query: "things to do in " + this.query}
      this.service.setSearchResults(this.request);
    })

    this.searchSubscription = this.service.getSearchResults().subscribe(results => {
      this.searchResults = results;
    })
  }

  showMap(){
    this.mapsService.setMapStatus(true);
  }

  hideMap(){
    this.mapsService.setMapStatus(false);
  }

}
