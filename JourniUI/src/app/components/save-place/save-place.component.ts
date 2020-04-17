import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Trip } from 'src/app/models/trip.model';
import { TripService } from 'src/app/services/trip.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-save-place',
  templateUrl: './save-place.component.html',
  styleUrls: ['./save-place.component.scss']
})
export class SavePlaceComponent implements OnInit {

  trips: Trip;
  userId

  constructor(public activeModal: NgbActiveModal, private tripService: TripService, private userService: UserService) { }

  ngOnInit(): void {
    
    // this.tripService.getAllTrips()
  }
  
  save(){

  }

}
