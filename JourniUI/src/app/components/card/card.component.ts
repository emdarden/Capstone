import { Component, OnInit, Input } from '@angular/core';
import { MapsService } from 'src/app/services/maps.service';
import { MapsAPILoader } from '@agm/core';


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
  markerPromise;
  marker

  constructor(private mapsService: MapsService, private mapsAPILoader: MapsAPILoader) { 
  
  }

  ngOnInit(): void {
    this.mapsService.getMapStatus().subscribe(res => {
      if (res) {
        this.mapsService.addMarker(this.cardItem);
      }
    })

    this.cardName = this.cardItem.result.name; //remove ".result" in prod
    this.cardImageURL = this.cardItem.result.photos[0].url; //change url to getUrl() in prod
    this.cardRating = this.cardItem.result.rating;
    this.cardTotalRatings = this.cardItem.result.user_ratings_total;
   
    // this.cardName = this.cardItem.name; //remove ".result" in prod
    // this.cardImageURL = this.cardItem.photos[0].getUrl(); //change url to getUrl() in prod
    // this.cardRating = this.cardItem.rating;
    // this.cardTotalRatings = this.cardItem.user_ratings_total;
    
  }

}


