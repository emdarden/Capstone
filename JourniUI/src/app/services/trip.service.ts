import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Trip } from '../models/trip.model';

@Injectable({
  providedIn: 'root'
})
export class TripService {
  constructor(private http: HttpClient) { 
  }

  getAllTrips(){
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get<Trip[]>('api/trips', { headers })
  }
  
  getTrip(tripId){
    tripId = tripId.toString();
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get<Trip>(`api/trips/${tripId}`, { headers })
  }

  createTrip(trip){
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post(`api/trips/${trip._id}`, JSON.stringify(trip), { headers })

  }

  removeTrip(trip){
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const params = new HttpParams().set('tripId', `${trip._id}`);

    return this.http.delete(`api/trips/${trip._id}`, { params , headers })
  }
}
