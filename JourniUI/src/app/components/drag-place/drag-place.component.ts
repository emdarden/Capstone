import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MapsService } from 'src/app/services/maps.service';
import { MapsAPILoader } from '@agm/core';
import { SearchResultsService } from 'src/app/services/search-results.service';

@Component({
  selector: 'app-drag-place',
  templateUrl: './drag-place.component.html',
  styleUrls: ['./drag-place.component.scss']
})
export class DragPlaceComponent implements OnInit {
  @Input() place;
  @Output("removePlace") removePlace = new EventEmitter();



  constructor() {
   
   }

  ngOnInit(): void {
    
  }

  remove(){
    this.removePlace.emit(this.place.PlaceId);
  }


}
