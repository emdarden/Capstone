import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MapsService {

  private map$ = new ReplaySubject<any>(1);

  constructor() { }

  getMap(){
    return this.map$.asObservable();
  }

  setMap(map){
    this.map$.next(map);
  }
}
