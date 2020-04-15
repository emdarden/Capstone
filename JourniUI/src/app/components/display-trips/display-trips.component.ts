import { Component, OnInit } from '@angular/core';
import { TripService } from 'src/app/services/trip.service';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-display-trips',
  templateUrl: './display-trips.component.html',
  styleUrls: ['./display-trips.component.scss']
})
export class DisplayTripsComponent implements OnInit {

  constructor(private tripService: TripService, private auth: AuthService, private user: UserService) { 
    document.body.style.margin = "0 75px";
  }

  trips;
  userId;
  

  ngOnInit(): void {

    this.auth.userProfile$.subscribe(user => {
      this.userId = user.sub
    })

    this.tripService.getAllTrips(this.userId).subscribe(trips => {
      this.trips = trips;
      console.log(this.trips)
    });
  
    
  }

}
