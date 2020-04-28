import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

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
