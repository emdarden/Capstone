import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Day } from '../models/day.model';

@Injectable({
  providedIn: 'root'
})
export class DayService {

  constructor(private http: HttpClient) { }

  public updateDays(tripId, days: Day[]){
    tripId = tripId.toString();
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const params = new HttpParams().set('tripId', `${tripId}`);

    return this.http.post('api/days', JSON.stringify(days), { headers , params})
  }

  public addDay(tripId, day){
    tripId = tripId.toString();
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const params = new HttpParams().set('tripId', `${tripId}`);

    return this.http.post(`api/days/${day}`, null , { headers , params})
    
  }

  public removeDay(tripId, day){
    tripId = tripId.toString();
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const params = new HttpParams().set('tripId', `${tripId}`);
    
    return this.http.delete(`api/days/${day}`, { headers , params})
    
  }
}
