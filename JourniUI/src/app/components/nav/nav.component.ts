import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  stateURL: string;
  name: string;

  constructor(public auth: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.auth.userProfile$.subscribe(res => {
      if(res) {this.name = res.nickname}
    })
    this.stateURL = this.router.routerState.snapshot.url;
  }

  showTrips() {
    this.router.navigate(['/trips']);
  }

}
