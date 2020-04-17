import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class TripService {
  constructor(private http: HttpClient, private auth: AuthService) { 
  }

  getAllTrips(){
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get('api/trips', { headers })
  }
  
  getTrip(tripName){
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get(`api/trips/${tripName}`, { headers })
  }

  createTrip(trip){
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post(`api/trips/${trip.Name}`, JSON.stringify(trip), { headers })

  }

  removeTrip(tripName){
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const params = new HttpParams().set('tripName', `${tripName}`);

    return this.http.delete(`api/trips/${tripName}`, { params , headers })
  }
}
