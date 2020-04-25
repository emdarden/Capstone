import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Trip } from 'src/app/models/trip.model';
import { TripService } from 'src/app/services/trip.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-create-trip',
  templateUrl: './create-trip.component.html',
  styleUrls: ['./create-trip.component.scss']
})
export class CreateTripComponent implements OnInit {
  @Output() refresh = new EventEmitter();

  trips
  tripSubscription$: Subscription;
  duplicate = false;
  blankInput = false;

  constructor(
    public activeModal: NgbActiveModal, 
    private tripService: TripService, 
    ) { }

  ngOnInit(): void {
    this.tripService.getAllTrips().subscribe(trips => this.trips = trips);
  }

  saveTrip(tripName){
    var duplicate = this.trips.find(trip => trip.Name.toLowerCase() === tripName.toLowerCase());
    if(duplicate){
      this.duplicate = true;
    } else if(tripName.length == 0) {
      this.blankInput = true;
    } else {
      const trip = new Trip(this.getPic(), tripName, []);
      this.tripSubscription$ = this.tripService.createTrip(trip).subscribe(res=> console.log(res));
      this.activeModal.close('Close click');

      this.refresh.emit();
    }
  }

  getPic(){
    var picNumber = (this.trips.length % 3) + 1
    console.log(this.trips.length)
    return `../../../assets/imgs/world_map_${picNumber}.png`
  }

}
