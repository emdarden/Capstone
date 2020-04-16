import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Trip } from 'src/app/models/trip.model';
import { TripService } from 'src/app/services/trip.service';
import { UserService } from 'src/app/services/user.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-trip',
  templateUrl: './create-trip.component.html',
  styleUrls: ['./create-trip.component.scss']
})
export class CreateTripComponent implements OnInit {
  @Output() refresh = new EventEmitter();

  user;
  tripSubscription$: Subscription;

  constructor(
    public activeModal: NgbActiveModal, 
    private tripService: TripService, 
    private userService: UserService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.userService.getUser().subscribe(user => this.user = user);
  }

  saveTrip(tripName){
    const trip = new Trip(this.getPic(), tripName, []);
    this.tripSubscription$ = this.tripService.createTrip(this.user.User_ID, trip).subscribe(res=> console.log(res));
    this.activeModal.close('Close click');

    this.refresh.emit();
    
  }

  getPic(){
    var picNumber = (this.user.Trips.length % 3) + 1
    console.log(this.user.Trips.length)
    return `../../../assets/imgs/world_map_${picNumber}.png`
  }

}
