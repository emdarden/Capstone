import { async, ComponentFixture, TestBed, tick } from '@angular/core/testing';

import { CardComponent } from './card.component';
import { SearchResultsService } from 'src/app/services/search-results.service';
import { Router, ActivatedRoute } from '@angular/router';
import { PlaceService } from 'src/app/services/place.service';
import { AuthService } from 'src/app/services/auth.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as faker from 'faker';
import { of, Subject } from 'rxjs';
import { MapsAPILoader } from '@agm/core';
import { MapsService } from 'src/app/services/maps.service';

fdescribe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;
  let searchServiceSpy: jasmine.SpyObj<SearchResultsService>;
  let routerSpy: jasmine.SpyObj<Router>;
  let placeServiceSpy: jasmine.SpyObj<PlaceService>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let modalServiceSpy: jasmine.SpyObj<NgbModal>;
  let mapsServiceSpy: jasmine.SpyObj<MapsService>;
  let activatedRouteSpy: jasmine.SpyObj<ActivatedRoute>;
  let placeMock;

  beforeEach(async(() => {
    searchServiceSpy = jasmine.createSpyObj(['getSelectedPlace', 'setSelectedPlace','setIsDetailOpen']);
    routerSpy = jasmine.createSpyObj(['navigate'], {routerState: { snapshot: { url: faker.internet.url }}});
    modalServiceSpy = jasmine.createSpyObj(['open'], {componentInstance: {place: {}, placeSaved: of('')}});
    placeServiceSpy = jasmine.createSpyObj(['getAllPlaces', 'removePlace'], {allPlaces: new Subject});
    authServiceSpy = jasmine.createSpyObj(['login'], ['loggedIn'] )
    mapsServiceSpy = jasmine.createSpyObj(['addMarker', 'setMapStatus', 'highlightMarker']);
    activatedRouteSpy = jasmine.createSpyObj([], {queryParamMap: of()});


    TestBed.configureTestingModule({
      declarations: [ CardComponent ],
      providers: [
        { provide: SearchResultsService, useValue: searchServiceSpy },
        { provide: Router, useValue: routerSpy},
        { provide: NgbModal, useValue: modalServiceSpy},
        { provide: PlaceService, useValue: placeServiceSpy},
        { provide: AuthService, useValue: authServiceSpy},
        { provide: MapsService, useValue: mapsServiceSpy},
        { provide: ActivatedRoute, useValue: activatedRouteSpy}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
    
    
    placeMock = {
      name: faker.random.word(),
      place_id: faker.random.alphaNumeric(10),
      photos: [
        {
          getUrl(){faker.internet.url}
        },
      ],
      rating: faker.random.number(5),
      user_total_ratings: faker.random.number()
    }
    
    component.cardItem = placeMock;
    component.index = faker.random.number(20)
    searchServiceSpy.getSelectedPlace.and.returnValue(of(placeMock));
    placeServiceSpy.getAllPlaces.and.returnValue(of([]));
    placeServiceSpy.allPlaces.next([])
    
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('#onInit', () => {
    it('set state url', () => {
      const url = routerSpy.routerState.snapshot.url;

      component.ngOnInit();

      expect(component.stateURL).toEqual(url);
    });

    it('set card values', () => {
      component.ngOnInit();

      expect(component.cardName).toEqual(placeMock.name);
      expect(component.cardImageURL).toEqual(placeMock.photos[0].getUrl())
      expect(component.cardRating).toEqual(placeMock.rating);
    });
  });

  fdescribe('#showDetails', () => {
    it('call methods', () => {

      placeMock.geometry = {
        location: {
          lat(){faker.random.number()},
          lng(){faker.random.number}
        }
      }

      const event = new Event('click');

      component.showDetails(event);

      expect(mapsServiceSpy.setMapStatus).toHaveBeenCalledWith(true);
      expect(mapsServiceSpy.highlightMarker).toHaveBeenCalled();
      expect(routerSpy.navigate).toHaveBeenCalled();
      expect(searchServiceSpy.setSelectedPlace).toHaveBeenCalledWith(placeMock);
      expect(searchServiceSpy.setIsDetailOpen).toHaveBeenCalledWith(true);
    });
  });
});
