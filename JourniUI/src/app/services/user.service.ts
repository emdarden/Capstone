import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private auth: AuthService, private http: HttpClient) {
   }

   getUser(){
    var userId = this.getUserId()
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const params = new HttpParams().set('id', `${userId}`);
  
    return this.http.get(`api/users/${userId}`, { params , headers })
   }

   getUserId(){
    var userId;
     
    this.auth.userProfile$.subscribe(user => {
      userId = user.sub;
    })

    return userId;
   }

}
