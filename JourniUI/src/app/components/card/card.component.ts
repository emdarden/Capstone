import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject, Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { MapsService } from 'src/app/services/maps.service';
import { PlaceService } from 'src/app/services/place.service';
import { SearchResultsService } from 'src/app/services/search-results.service';
import { SavePlaceComponent } from '../save-place/save-place.component';


@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() cardItem;
  @Input() showMap;
  @Input() index;
  
  map;
  cardName: string;
  cardImageURL: string;
  cardRating: number;
  cardTotalRatings: number;
  query: string;
  placeSaved: boolean;
  allPlaces;
  allPlaces$: Subscription;
  placeSubscription$: Subscription;
  placeStatus = new Subject();
  stateURL: string;

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

    this.stateURL = this.router.routerState.snapshot.url;

    this.cardName = this.cardItem.name; //remove ".result" in prod
    this.cardImageURL = this.cardItem.photos[0].getUrl(); //change url to getUrl() in prod
    // this.cardImageURL = this.cardItem.photos[0].url; //change url to getUrl() in prod
    this.cardRating = this.cardItem.rating;
    this.cardTotalRatings = this.cardItem.user_ratings_total;
    
    this.mapsService.addMarker(this.cardItem, this.index);

    this.route.queryParamMap.subscribe((ParamsAsMap) => {
      this.query = ParamsAsMap['params'].query;
    });

    this.placeService.getAllPlaces().subscribe(res => {
      this.allPlaces = res;
      this.placeSaved = this.allPlaces.includes(this.cardItem.place_id)
    })

    this.allPlaces$ = this.placeService.allPlaces.subscribe(res => {
      this.allPlaces = res;
      this.placeSaved = this.allPlaces.includes(this.cardItem.place_id)
    })

  }

  showDetails(){
    event.stopPropagation();
    var position = {lat: this.cardItem.geometry.location.lat(), lng: this.cardItem.geometry.location.lng()}
    // var position = this.cardItem.geometry.location;
    this.mapsService.setMapStatus(true);
    this.mapsService.highlightMarker(position, this.index);
    this.router.navigate(['/search'], { queryParams: {query: this.query, place: this.cardName}}).then;
    this.searchService.setSelectedPlace(this.cardItem);
    this.searchService.setIsDetailOpen(true);
  }

  savePlace(){
    event.stopPropagation();
    if(!this.auth.loggedIn){
      this.auth.login(this.stateURL);
    } else if(!this.placeSaved) {      
      const modalRef = this.modalService.open(SavePlaceComponent, { centered: true , size: 'sm' });
      modalRef.componentInstance.place = this.cardItem;
      modalRef.componentInstance.placeSaved.subscribe(res => {
        this.placeSaved = true;
      })
    } else{
      this.placeService.removePlace(this.cardItem.place_id).subscribe(res => {
        this.placeSaved = false;
      })
    }
  }

  isPlaceSaved(){
    return this.allPlaces.includes(this.cardItem.place_id)
  }

}


