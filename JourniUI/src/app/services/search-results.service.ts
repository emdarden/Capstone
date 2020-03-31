import { Injectable } from '@angular/core';
import { ReplaySubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchResultsService {

  private searchResult$ = new ReplaySubject<any>(1);

  constructor() { }

  public searchResults(): Observable<any>{
    return this.searchResult$.asObservable();
  }

  public setSearchResults(results){
    this.searchResult$.next(results);
  }
}
