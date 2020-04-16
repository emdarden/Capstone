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
  
  getTrip(userId, tripName){
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const params = new HttpParams().set('id', `${userId}`);

    return this.http.get(`api/trips/${tripName}`, { params , headers })
  }

  createTrip(userId, trip){
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const params = new HttpParams().set('id', `${userId}`);

    return this.http.post(`api/trips/${trip.Name}`, JSON.stringify(trip), { params , headers })

  }

  removeTrip(userId, tripName){
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const params = new HttpParams().set('id', `${userId}`).set('tripName', `${tripName}`);

    return this.http.delete(`api/trips/${tripName}`, { params , headers })
  }
}
