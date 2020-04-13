import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthLockService } from 'src/app/services/auth-lock.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  constructor(public auth: AuthLockService, private router: Router) { }

  ngOnInit(): void {
  }

  showProfile() {
    this.router.navigate(['/profile']);
  }

}
