import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Place } from '../models/place.model';

@Injectable({
  providedIn: 'root'
})
export class PlaceService {

  constructor(private http: HttpClient) { }

  public addPlace(tripId, place: Place){
    tripId = tripId.toString();
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const params = new HttpParams().set('tripId', `${tripId}`);

    return this.http.post(`api/places/${place.PlaceId}`, JSON.stringify(place), { headers , params})
  }
}
