import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { TripService } from 'src/app/services/trip.service';
import { ActivatedRoute } from '@angular/router';
import { Trip } from 'src/app/models/trip.model';
import { switchMap } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { DayService } from 'src/app/services/day.service';
import { PlaceService } from 'src/app/services/place.service';

@Component({
  selector: 'app-display-trip',
  templateUrl: './display-trip.component.html',
  styleUrls: ['./display-trip.component.scss']
})
export class DisplayTripComponent implements OnInit {

  tripId: string;
  trip: Trip;
  days; 

  constructor(
    private tripService: TripService, 
    private route: ActivatedRoute,
    private dayService: DayService,
    private placeService: PlaceService
    ) {}

  ngOnInit(): void {
    this.tripId = this.route.snapshot.paramMap.get('id');

    this.getTrip();
    // this.tripService.getTrip(this.tripId).subscribe(res => {
    //   this.trip = res;
    //   console.log(this.trip)
    // })
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
    this.dayService.updateDays(this.tripId, this.trip.Days).subscribe(res => {
      this.getTrip();
    })
  }

  getTrip(){
    this.tripService.getTrip(this.tripId).subscribe(res => {
      this.trip = res;
      this.days = res.Days.length - 1
    })
  }

  removePlace(placeId){
    this.placeService.removePlace(placeId).subscribe(res => this.getTrip());
  }

  addDays(){
    this.dayService.addDay(this.trip._id, (this.trip.Days.length + 1)).subscribe( res => {
      this.getTrip()
    })
  }

  removeDays(){
    this.dayService.removeDay(this.trip._id, (this.trip.Days.length)).subscribe( res => {
      this.getTrip()
    })
  }

}
