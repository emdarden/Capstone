import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userId;

  constructor(private auth: AuthService) {
    // this.auth.userProfile$.subscribe(user => this.userId = user.sub)
   }

}
