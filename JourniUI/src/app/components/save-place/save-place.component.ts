import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Trip } from 'src/app/models/trip.model';
import { TripService } from 'src/app/services/trip.service';
import { CreateTripComponent } from '../create-trip/create-trip.component';
import { Place } from 'src/app/models/place.model';
import { PlaceService } from 'src/app/services/place.service';

@Component({
  selector: 'app-save-place',
  templateUrl: './save-place.component.html',
  styleUrls: ['./save-place.component.scss']
})
export class SavePlaceComponent implements OnInit {
  @Input() place;
  @Output() placeSaved = new EventEmitter();

  trips: Trip[];
  selectedTrip: Trip;

  constructor(public activeModal: NgbActiveModal, private tripService: TripService, private modalService: NgbModal, private placeService: PlaceService) { }

  ngOnInit(): void {
    // this.tripService.getAllTrips().subscribe(trips => this.trips = trips);
    this.getTrips();
  }
  
  save(){
    var newPlace = new Place(this.place.place_id, this.place.name, this.place.photos[0].url, this.place.geometry.location);
    this.placeService.addPlace(this.selectedTrip._id, newPlace).subscribe(res => {
      this.placeSaved.emit();
    })
    this.placeService.getAllPlaces();
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
