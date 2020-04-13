import { Component, OnInit } from '@angular/core';
import { AuthLockService } from 'src/app/services/auth-lock.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  userProfile;


  constructor(public auth: AuthLockService) { }

  ngOnInit(): void {

    // this.auth.userProfile$.subscribe(profile => {
    //   this.userProfile = profile;
    //   console.log(this.userProfile)
    // })
  }


}
