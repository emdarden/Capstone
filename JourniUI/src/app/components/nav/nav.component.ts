import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  stateURL;
  constructor(public auth: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.stateURL = this.router.routerState.snapshot.url;
  }

  showProfile() {
    this.router.navigate(['/profile']);
  }

  showTrips() {
    this.router.navigate(['/trips']);
  }

}
