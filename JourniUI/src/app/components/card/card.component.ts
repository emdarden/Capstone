import { Component, OnInit, Input } from '@angular/core';
import { MapsAPILoader } from '@agm/core';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() cardItem;

  cardName: string;
  cardImageURL: string;

  constructor() { 
  }

  ngOnInit(): void {
    console.log(this.cardItem);
    this.cardName = this.cardItem.result.name; //remove ".result" in prod
    this.cardImageURL = this.cardItem.result.photos[0].url; //change url to getUrl() in prod
  }

}
