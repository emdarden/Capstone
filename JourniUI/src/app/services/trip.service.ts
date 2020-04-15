import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TripService {

  constructor(private http: HttpClient) { }

  getAllTrips(userId){
    return this.http.get(`api/users/${userId}/trips`)
  }
  
  getTrip(userId, tripId){
    return this.http.get(`api/users/${userId}/trips/${tripId}`)
  }

  addTrip(userId, trip){

  }
}
