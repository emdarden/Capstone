import { Component, OnInit } from '@angular/core';
import { TripService } from 'src/app/services/trip.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CreateTripComponent } from '../create-trip/create-trip.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-display-trips',
  templateUrl: './display-trips.component.html',
  styleUrls: ['./display-trips.component.scss']
})
export class DisplayTripsComponent implements OnInit {

  constructor(
    private tripService: TripService, 
    private modalService: NgbModal,
    ) { 
    document.body.style.margin = "0 75px";
  }

  trips;
  userId;
  tripsSubscription$: Subscription;

  ngOnInit(): void {
    this.getTrips();
  }

  createTrip(){
    const modalRef = this.modalService.open(CreateTripComponent, { centered: true , size: 'sm' });

    modalRef.componentInstance.refresh.subscribe(() => {
      this.getTrips();
    })
  }

  confirmRemoveTrip(content){
    this.modalService.open(content, { size: 'sm' ,centered: true});
  }

  removeTrip(trip){
    this.tripService.removeTrip(trip).subscribe(res => console.log(res));
    this.modalService.dismissAll('Close click');
    this.getTrips();
  }

  getTrips(){
    setTimeout(() => {
      this.tripsSubscription$ = this.tripService.getAllTrips().subscribe(trips => {
        this.trips = trips;
        console.log(this.trips)
      });
    }, 200)   
  }
}
