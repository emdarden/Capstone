import { Component, OnInit, Input, Output } from '@angular/core';
import { MapsService } from 'src/app/services/maps.service';
import { MapsAPILoader } from '@agm/core';
import { ActivatedRoute, Router } from '@angular/router';
import {Location} from '@angular/common';
import { EventEmitter } from 'protractor';
import { SearchResultsService } from 'src/app/services/search-results.service';


@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() cardItem;

  cardName: string;
  cardImageURL: string;
  cardRating: number;
  cardTotalRatings: number;
  map;
  query;

  constructor(private mapsService: MapsService, 
    private route: ActivatedRoute, 
    private router: Router, 
    private searchService: SearchResultsService) { 
  
  }

  ngOnInit(): void {

    this.cardName = this.cardItem.name; //remove ".result" in prod
    // this.cardImageURL = this.cardItem.photos[0].getUrl(); //change url to getUrl() in prod
    this.cardImageURL = this.cardItem.photos[0].url; //change url to getUrl() in prod
    this.cardRating = this.cardItem.rating;
    this.cardTotalRatings = this.cardItem.user_ratings_total;
    
    this.mapsService.addMarker(this.cardItem);

    this.route.queryParamMap.subscribe((ParamsAsMap) => {
      this.query = ParamsAsMap['params'].query;
    });

  }

  showDetails(){
    event.stopPropagation();
    // var position = {lat: this.cardItem.geometry.location.lat(), lng: this.cardItem.geometry.location.lng()}
    var position = this.cardItem.geometry.location;
    this.mapsService.setMapStatus(true);
    this.mapsService.highlightMarker(position);
    this.router.navigate(['/search'], { queryParams: {query: this.query, place: this.cardName}}).then;
    this.searchService.setSelectedPlace(this.cardItem);
    this.searchService.setIsDetailOpen(true);
  }

  savePlace(){
    event.stopPropagation();
    console.log("place saved")
  }

}


