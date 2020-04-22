import { Injectable } from '@angular/core';
import { ReplaySubject, Observable, Subject } from 'rxjs';
import { MapsAPILoader } from '@agm/core';
import * as data from '../../assets/sampledata.json'


@Injectable({
  providedIn: 'root'
})
export class SearchResultsService {

  private searchResult$ = new ReplaySubject<any>(1);
  private placeService;
  private selectedPlace$ = new ReplaySubject;
  private isDetailOpen$ = new Subject<boolean>();
  servicePromise: Promise<any>;
  sampleData: any = (data as any).default;

  constructor(private mapsAPILoader: MapsAPILoader ) {
    this.servicePromise = this.mapsAPILoader.load().then(() => {
      this.placeService = new google.maps.places.PlacesService(document.createElement('div'));
    })
   }

  public getSearchResults(): Observable<any>{
    return this.searchResult$.asObservable();
  }

  public setSearchResults(request): Observable<any>{
     var resultDetails;

   
    this.servicePromise.then(() => { 
      const googleSearch = query => {
        return new Promise((resolve, reject) => {
          this.placeService.textSearch(query, (results, status) => {
            if(status === 'OK') {
              resolve(results);
            } else {
              reject(status);
            }
          })
        }).then(results => {
          return this.getDetails(results);
        }).then(results => {
          this.searchResult$.next(results);
        })
      };
  
     googleSearch(request)
    })

    return resultDetails;
    // this.searchResult$.next(this.sampleData);
    // return this.sampleData
  }

  getDetails(results) {
    var details = [];
    var i = 1;

    for(let place of results) {
      setTimeout(() => {
        this.placeService.getDetails({placeId: place.place_id}, (res, status) => {
          if(status === "OK"){
            details.push(res)
          } else {
            console.log(status)
          }
        })
      }, 275 * i)
      i++;
    }
    return details;
  }

  getSelectedPlace(){
    return this.selectedPlace$.asObservable();
  }

  setSelectedPlace(place){
    this.selectedPlace$.next(place);
  }

  setIsDetailOpen(bool: boolean){
    this.isDetailOpen$.next(bool);
  }

  getIsDetailOpen(){
    return this.isDetailOpen$.asObservable();
  }
}
