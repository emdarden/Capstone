import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Place } from '../models/place.model';
import { Day } from '../models/day.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlaceService {

  placeStatus = new Subject();

  constructor(private http: HttpClient) { }

  public addPlace(tripId, place: Place){
    tripId = tripId.toString();
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const params = new HttpParams().set('tripId', `${tripId}`);

    return this.http.post(`api/places/${place.PlaceId}`, JSON.stringify(place), { headers , params})
  }

  public getAllPlaces(){
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get<string[]>(`api/places`, { headers })
  }

  public removePlace(placeId){
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.delete<Day>(`api/places/${placeId}`, { headers })

  }


}
