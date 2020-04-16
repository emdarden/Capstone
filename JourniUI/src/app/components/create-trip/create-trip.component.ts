import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Trip } from 'src/app/models/trip.model';
import { TripService } from 'src/app/services/trip.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-create-trip',
  templateUrl: './create-trip.component.html',
  styleUrls: ['./create-trip.component.scss']
})
export class CreateTripComponent implements OnInit {

  user;

  constructor(public activeModal: NgbActiveModal, private tripService: TripService, private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getUser().subscribe(user => this.user = user);
  }

  saveTrip(tripName){
    const trip = new Trip(this.getPic(), tripName, []);
    this.tripService.createTrip(this.user.User_ID, trip).subscribe(res=> console.log(res));
    this.activeModal.close('Close click')
  }

  getPic(){
    var picNumber = (this.user.Trips.length % 3) + 1

    return `../../../assets/imgs/world_map_${picNumber}.png`
  }

}
