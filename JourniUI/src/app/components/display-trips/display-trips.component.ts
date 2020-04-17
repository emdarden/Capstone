import { Component, OnInit } from '@angular/core';
import { TripService } from 'src/app/services/trip.service';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CreateTripComponent } from '../create-trip/create-trip.component';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-display-trips',
  templateUrl: './display-trips.component.html',
  styleUrls: ['./display-trips.component.scss']
})
export class DisplayTripsComponent implements OnInit {

  constructor(
    private tripService: TripService, 
    private auth: AuthService,
    private user: UserService, 
    private modalService: NgbModal,
    private router: Router
    ) { 
    document.body.style.margin = "0 75px";
  }

  trips;
  userId;
  tripsSubscription$: Subscription;

  ngOnInit(): void {

    this.auth.userProfile$.subscribe(user => {
      this.userId = user.sub
    })
    
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

  removeTrip(tripName){
    this.tripService.removeTrip(tripName).subscribe(res => console.log(res));
    this.modalService.dismissAll('Close click');
    this.getTrips();
  }

  getTrips(){
    setTimeout(() => {
      this.tripsSubscription$ = this.tripService.getAllTrips().subscribe(trips => {
        this.trips = trips;
      });
    }, 100)   
  }
}
