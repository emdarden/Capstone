import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { TripService } from 'src/app/services/trip.service';
import { ActivatedRoute } from '@angular/router';
import { Trip } from 'src/app/models/trip.model';
import { switchMap } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { DayService } from 'src/app/services/day.service';

@Component({
  selector: 'app-display-trip',
  templateUrl: './display-trip.component.html',
  styleUrls: ['./display-trip.component.scss']
})
export class DisplayTripComponent implements OnInit {

  tripId: string;
  trip: Trip;

  constructor(
    private tripService: TripService, 
    private route: ActivatedRoute,
    private dayService: DayService
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
    })
  }

}
