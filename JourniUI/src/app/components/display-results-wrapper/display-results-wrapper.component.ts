import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';
import { MapsService } from 'src/app/services/maps.service';
import { SearchResultsService } from 'src/app/services/search-results.service';

@Component({
  selector: 'app-display-results-wrapper',
  templateUrl: './display-results-wrapper.component.html',
  styleUrls: ['./display-results-wrapper.component.scss'],
  
})
export class DisplayResultsWrapperComponent implements OnInit{
  searchResult$: Subscription;
  searchResults;
  searchSubscription: Subscription;
  query: string;
  request;
  placeService;

  loading = false;
  showMapBool = false;
  detailOpen= false;

  constructor( 
    private route: ActivatedRoute,
    private service: SearchResultsService,
    private mapsService: MapsService,
    private router: Router) {
      document.body.style.margin = "0 75px"
     }

  ngOnInit(): void {
    this.loading = true;
    this.mapsService.initMap(document.getElementById('map'));

    this.mapsService.getMapStatus().subscribe(res => {
      if(res){
        this.mapsService.refreshMap();
        this.showMapBool = true;
      } else {
        this.showMapBool = false;
      }
    })
    
    this.route.queryParamMap.pipe(distinctUntilChanged((a,b) => a['params'].query === b['params'].query)).subscribe((ParamsAsMap) => {
      this.query = ParamsAsMap['params'].query;
      this.request = {query: "things to do in " + this.query};
      this.mapsService.removeMarkers();
      this.service.setSearchResults(this.request);
    })
    
    this.searchSubscription = this.service.getSearchResults().subscribe(results => {
      console.log(results)
      this.searchResults = results;
      this.loading = false;
    })

    this.service.getIsDetailOpen().subscribe(bool => this.detailOpen = bool)
  }

  showMap(){
    this.mapsService.setMapStatus(true);
  }

  hideMap(){
    this.router.navigate(['/search'], { queryParams: {query: this.query}});
    this.mapsService.setMapStatus(false);
    if(this.detailOpen){
      this.service.setIsDetailOpen(false);
    }
  }

}
