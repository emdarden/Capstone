import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  // ping$(): Observable<any> {
  //   return this.http.get('/api/users');
  // }
  getUser(userId){   

    return this.http.get(`api/users/${userId}`);
  }

  getTrips(userId){
    return this.http.get(`api/users/${userId}/trips`)
  }

  getTrip(userId, tripName){
    return this.http.get(`api/users/${userId}/trips/${tripName}`)
  }

  getPlaces(userId, tripName){
    return this.http.get(`api/users/${userId}/trips/${tripName}/places`)
  }

  getPlace(userId, tripName, placeId){
    return this.http.get(`api/users/${userId}/trips/${tripName}/places/${placeId}`)
  }
}