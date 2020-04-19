import { Component, OnInit, Input } from '@angular/core';
import { SearchResultsService } from 'src/app/services/search-results.service';
import { Router } from '@angular/router';
import { MapsService } from 'src/app/services/maps.service';
import { AuthService } from 'src/app/services/auth.service';
import { SavePlaceComponent } from '../save-place/save-place.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

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

  constructor(
    private searchService: SearchResultsService, 
    private router: Router, 
    private mapsService: MapsService, 
    private auth: AuthService,
    private modalService: NgbModal) { }

  ngOnInit(): void {

    this.searchService.getSelectedPlace().subscribe(place => {
      this.place = place;
      // this.images[0] = this.place.photos[0].url;
      // this.images[0] = this.place.photos[0].getUrl();
      this.getImages(this.place.photos);
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
      this.modalService.open(SavePlaceComponent, { centered: true , size: 'sm' });
      this.placeSaved = true; // need observable
    } else{
      this.placeSaved = false
    }
  }

  getImages(photos){
    this.images = photos.map(photo => photo.getUrl());
  }

}
