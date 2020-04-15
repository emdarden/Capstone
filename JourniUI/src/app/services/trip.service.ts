import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TripService {

  constructor(private http: HttpClient) { }

  getAllTrips(userId){
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const params = new HttpParams().set('id', `${userId}`);

    return this.http.get('api/trips', { params , headers })
  }
  
  getTrip(userId, tripId){
    return this.http.get(`api/users/${userId}/trips/${tripId}`)
  }

  addTrip(userId, trip){

  }
}
