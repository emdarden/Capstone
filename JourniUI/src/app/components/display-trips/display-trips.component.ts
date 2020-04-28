import { Component, OnInit } from '@angular/core';
import { TripService } from 'src/app/services/trip.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CreateTripComponent } from '../create-trip/create-trip.component';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { Trip } from 'src/app/models/trip.model';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-display-trips',
  templateUrl: './display-trips.component.html',
  styleUrls: ['./display-trips.component.scss']
})
export class DisplayTripsComponent implements OnInit {

  constructor(
    private tripService: TripService, 
    private modalService: NgbModal,
    private router: Router,
    private route: ActivatedRoute
    ) { 
    document.body.style.margin = "0 75px";
  }

  trips;
  userId;
  tripsSubscription$: Subscription;
  selectedTripId;

  ngOnInit(): void {
    this.route.paramMap.pipe(
      switchMap(params => {
        this.selectedTripId = params.get('id');
        return this.tripService.getAllTrips();
      })
    )

    this.getTrips();
  }

  createTrip(){
    const modalRef = this.modalService.open(CreateTripComponent, { centered: true , size: 'sm' });

    modalRef.componentInstance.refresh.subscribe(() => {
      this.getTrips();
    })
  }

  confirmRemoveTrip(content){
    event.stopPropagation();
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
    }, 300)   
  }

  showTrip(trip: Trip){
    event.stopPropagation();
    this.router.navigate(['/trips', trip._id]);
  }
}
