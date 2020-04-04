import { Component, OnInit, Input } from '@angular/core';


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

  constructor() { 
  }

  ngOnInit(): void {
    console.log(this.cardItem);
    this.cardName = this.cardItem.result.name; //remove ".result" in prod
    this.cardImageURL = this.cardItem.result.photos[0].url; //change url to getUrl() in prod
    this.cardRating = this.cardItem.result.rating;
    this.cardTotalRatings = this.cardItem.result.user_ratings_total;
  }

}
