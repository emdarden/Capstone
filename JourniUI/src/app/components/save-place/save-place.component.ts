import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Trip } from 'src/app/models/trip.model';
import { TripService } from 'src/app/services/trip.service';
import { CreateTripComponent } from '../create-trip/create-trip.component';

@Component({
  selector: 'app-save-place',
  templateUrl: './save-place.component.html',
  styleUrls: ['./save-place.component.scss']
})
export class SavePlaceComponent implements OnInit {

  trips: Trip[];
  selectedTrip: string;

  constructor(public activeModal: NgbActiveModal, private tripService: TripService, private modalService: NgbModal) { }

  ngOnInit(): void {
    
    // this.tripService.getAllTrips().subscribe(trips => this.trips = trips);
    this.getTrips();
  }
  
  save(){
    console.log(this.selectedTrip);
    this.activeModal.close('Close click');
  }

  createTrip(){
    const modalRef = this.modalService.open(CreateTripComponent, { centered: true , size: 'sm' });

    modalRef.componentInstance.refresh.subscribe(() => {
      this.getTrips();
    })
  }

  getTrips(){
    setTimeout(() => {
      this.tripService.getAllTrips().subscribe(trips => {
        this.trips = trips;
      });
    }, 100)   
  }
}
