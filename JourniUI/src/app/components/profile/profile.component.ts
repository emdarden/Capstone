import { Component, OnInit } from '@angular/core';
import { AuthLockService } from 'src/app/services/auth-lock.service';
import { AuthService } from 'src/app/services/auth.service';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  userProfile;
  user;


  constructor(public auth: AuthService, private api: ApiService) { 
    document.body.style.margin = "0 75px";
  }

  ngOnInit(): void {

    this.auth.userProfile$.subscribe(profile => {
      this.userProfile = profile;
      console.log(this.userProfile)
      this.api.getUser(this.userProfile.sub).subscribe(user => console.log(user));
    })
  }


}
