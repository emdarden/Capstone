import { Component, OnInit, Input } from '@angular/core';
import { SearchResultsService } from 'src/app/services/search-results.service';
import { Router } from '@angular/router';
import { MapsService } from 'src/app/services/maps.service';
import { AuthService } from 'src/app/services/auth.service';
import { SavePlaceComponent } from '../save-place/save-place.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PlaceService } from 'src/app/services/place.service';

@Component({
  selector: 'app-place-detail',
  templateUrl: './place-detail.component.html',
  styleUrls: ['./place-detail.component.scss']
})
export class PlaceDetailComponent implements OnInit {

  @Input() query;
  isCollapsed = true;
  placeSaved;

  place;
  images = [];
  showNavigationArrows = true;
  showNavigationIndicators = true;
  allPlaces;

  constructor(
    private searchService: SearchResultsService, 
    private router: Router, 
    private mapsService: MapsService, 
    private auth: AuthService,
    private modalService: NgbModal,
    private placeService: PlaceService) { }

  ngOnInit(): void {

    this.searchService.getSelectedPlace().subscribe(place => {
      this.place = place;
      this.images[0] = this.place.photos[0].url;
      // this.getImages(this.place.photos);

      this.placeService.getAllPlaces().subscribe(res => {
        this.allPlaces = res;
        this.placeSaved = this.allPlaces.includes(this.place.place_id)
      })
    })

    console.log(this.place)

  }

  hideDetails(){
    this.router.navigate(['/search'], { queryParams: {query: this.query}});
    this.searchService.setIsDetailOpen(false);
    this.mapsService.refreshMap();
  }

  savePlace(){
    event.stopPropagation();
    if(!this.auth.loggedIn){
      this.auth.login();
    } else if(!this.placeSaved) {      
      const modalRef = this.modalService.open(SavePlaceComponent, { centered: true , size: 'sm' });
      modalRef.componentInstance.place = this.place;
      modalRef.componentInstance.placeSaved.subscribe(res => {
        this.placeSaved = true;
      })
    } else{
      this.placeService.removePlace(this.place.place_id).subscribe(res => {
        console.log(res);
        this.placeSaved = false;
      })
    }
  }

  isPlaceSaved(){
    return this.allPlaces.includes(this.place.place_id)
  }

  getImages(photos){
    this.images = photos.map(photo => photo.getUrl());
  }

}
