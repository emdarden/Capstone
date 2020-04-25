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

  addMarker(place, index){
    // var position = place.geometry.location
    var position = {lat: place.geometry.location.lat(), lng: place.geometry.location.lng()}
    var id = '#id' + index
    this.mapPromise.then(() => {
      var marker = new google.maps.Marker({position: position, map: this.map})
      var infowindow = new google.maps.InfoWindow({ content: '<h6>' + place.name + '</h6>'})
      var card = <HTMLElement>document.querySelector(id)

      card.addEventListener('mouseover', () => {
        infowindow.open( this.map, marker );
      });
      
      card.addEventListener('mouseout', function() {
        infowindow.close();
      });

      card.addEventListener('click', () => {
        for (var i = 0; i < this.markers.length; i++) {
          document.querySelector('#id' + i).classList.remove("highlight")
        }
      })

      google.maps.event.addListener(infowindow, "closeclick", function() {
        card.classList.remove("highlight")
      });

      marker.addListener('click', () => {
        for (var i = 0; i < this.markers.length; i++) {
          document.querySelector('#id' + i).classList.remove("highlight")
          this.markers[i].infowindow.close();
        }
        infowindow.open(this.map, marker);
       
        window.scroll({ top: card.offsetTop - 100, behavior: "smooth" });
        card.classList.add("highlight")
      })


      this.markers.push({marker: marker, infowindow: infowindow, index: index})
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
      for (var i = 0; i < this.markers.length; i++) {
        this.markers[i].infowindow.close();
      }
      google.maps.event.trigger(this.map, 'resize');
      this.map.fitBounds(this.latlngBounds);
    }, 300);
  }

  highlightMarker(position, index){
    setTimeout(() => {
      google.maps.event.trigger(this.map, 'resize');
      this.map.setZoom(14);
      this.map.panTo(position)
      var m = this.markers.find(marker => marker.index == index)
      m.infowindow.open(this.map, m.marker)
    }, 500);

  }

  removeMarkers(){
    for (var i = 0; i < this.markers.length; i++) {
      this.markers[i].marker.setMap(null);
    }

    this.mapPromise.then(() => {
      this.latlngBounds = new google.maps.LatLngBounds();
    })

    this.markers = []
  }

}
