import { Injectable } from '@angular/core';
import { ReplaySubject, Observable, Subject } from 'rxjs';
import { MapsAPILoader } from '@agm/core';

@Injectable({
  providedIn: 'root'
})
export class MapsService {

  latlngBounds;
  private mapPromise;
  markers = [];
  map;
  mapStatus$ = new Subject;

  constructor(private mapsAPILoader: MapsAPILoader) { 
    this.mapPromise = this.mapsAPILoader.load().then(() => {
      this.latlngBounds = new google.maps.LatLngBounds();
    });
  }

  initMap(mapDiv){
    
    this.mapPromise.then(() => {
      this.latlngBounds = new google.maps.LatLngBounds();
      this.map = new google.maps.Map(mapDiv);
      this.map.setCenter(this.latlngBounds.getCenter());
      this.map.fitBounds(this.latlngBounds);
    })
  }

  addMarker(place){
    var position = place.result.geometry.location
    // var position = {lat: place.geometry.location.lat(), lng: place.geometry.location.lng()}

    this.mapPromise.then(() => {
      this.markers.push(new google.maps.Marker({position: position, map: this.map}))
      this.latlngBounds.extend(position);
      this.map.setCenter(this.latlngBounds.getCenter());
      this.map.fitBounds(this.latlngBounds);
    })

  }

  setMapStatus(status){
    return this.mapStatus$.next(status);
  }

  getMapStatus(){
    return this.mapStatus$
  }

  refreshMap(){
    setTimeout(() => {
      google.maps.event.trigger(this.map, 'resize');
      this.map.fitBounds(this.latlngBounds);
    }, 250);
  }

}
