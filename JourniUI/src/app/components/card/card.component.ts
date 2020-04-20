import { Component, OnInit, Input, Output } from '@angular/core';
import { MapsService } from 'src/app/services/maps.service';
import { MapsAPILoader } from '@agm/core';
import { ActivatedRoute, Router } from '@angular/router';
import {Location} from '@angular/common';
import { EventEmitter } from 'protractor';
import { SearchResultsService } from 'src/app/services/search-results.service';
import { AuthService } from 'src/app/services/auth.service';
import { ApiService } from 'src/app/services/api.service';
import { SavePlaceComponent } from '../save-place/save-place.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PlaceService } from 'src/app/services/place.service';


@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() cardItem;
  @Input() showMap;
  
  cardName: string;
  cardImageURL: string;
  cardRating: number;
  cardTotalRatings: number;
  map;
  query;
  userId;
  placeSaved;
  allPlaces: string[];

  constructor(private mapsService: MapsService, 
    private route: ActivatedRoute, 
    private router: Router, 
    private searchService: SearchResultsService,
    private auth: AuthService,
    private modalService: NgbModal,
    private placeService: PlaceService
    ) { 
  
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

    this.placeService.getAllPlaces().subscribe(res => {
      this.allPlaces = res;
      this.placeSaved = this.allPlaces.includes(this.cardItem.place_id)
    })


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
    if(!this.auth.loggedIn){
      this.auth.login();
    } else if(!this.placeSaved) {      
      const modalRef = this.modalService.open(SavePlaceComponent, { centered: true , size: 'sm' });
      modalRef.componentInstance.place = this.cardItem;
      this.placeSaved = this.isPlaceSaved();
    } else{
      this.placeSaved = false
      this.placeService.removePlace(this.cardItem.place_id).subscribe(res => console.log(res))
    }
  }

  isPlaceSaved(){
    return this.allPlaces.includes(this.cardItem.place_id)
  }


}


