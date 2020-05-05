import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaceDetailComponent } from './place-detail.component';
import { SearchResultsService } from 'src/app/services/search-results.service';
import { Router, RouterState, RouterStateSnapshot } from '@angular/router';
import { MapsService } from 'src/app/services/maps.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PlaceService } from 'src/app/services/place.service';
import { of, Subject, race } from 'rxjs';
import * as faker from 'faker';
import { AuthService } from 'src/app/services/auth.service';

describe('PlaceDetailComponent', () => {
  let component: PlaceDetailComponent;
  let fixture: ComponentFixture<PlaceDetailComponent>;
  let searchServiceSpy: jasmine.SpyObj<SearchResultsService>;
  let routerSpy: jasmine.SpyObj<Router>;
  let mapsServiceSpy: jasmine.SpyObj<MapsService>;
  let modalServiceSpy;
  let placeServiceSpy: jasmine.SpyObj<PlaceService>;
  let placeMock;
  let authServiceSpy: jasmine.SpyObj<AuthService>;

  beforeEach(async(() => {
    searchServiceSpy = jasmine.createSpyObj(['getSelectedPlace', 'setIsDetailOpen']);
    routerSpy = jasmine.createSpyObj(['navigate'], {routerState: { snapshot: { url: faker.internet.url }}});
    mapsServiceSpy = jasmine.createSpyObj(['refreshMap']);
    modalServiceSpy = jasmine.createSpyObj(['open'], {componentInstance: {place: {}, placeSaved: of('')}});
    placeServiceSpy = jasmine.createSpyObj(['getAllPlaces', 'removePlace'], {allPlaces: new Subject});
    authServiceSpy = jasmine.createSpyObj(['login'], {loggedIn: false} )

    placeMock = {
      place_id: faker.random.alphaNumeric(10),
      photos: []
    }

    searchServiceSpy.getSelectedPlace.and.returnValue(of(placeMock));
    placeServiceSpy.getAllPlaces.and.returnValue(of([]));
    placeServiceSpy.allPlaces.next([])


    TestBed.configureTestingModule({
      declarations: [ PlaceDetailComponent ],
      providers: [
        { provide: SearchResultsService, useValue: searchServiceSpy },
        { provide: Router, useValue: routerSpy},
        { provide: MapsService, useValue: mapsServiceSpy},
        { provide: NgbModal, useValue: modalServiceSpy},
        { provide: PlaceService, useValue: placeServiceSpy},
        { provide: AuthService, useValue: authServiceSpy}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaceDetailComponent);
    component = fixture.componentInstance;
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

    it('set place and images', () => {
      spyOn(component, 'getImages');
      placeMock.photos =[
        faker.internet.url,
        faker.internet.url
      ]

      component.ngOnInit()

      expect(component.place).toEqual(placeMock);
      expect(component.getImages).toHaveBeenCalledWith(placeMock.photos);
    });

    it('set all paces and place saved', () => {
      const mockPlaces = [
        faker.random.alphaNumeric(10),
        faker.random.alphaNumeric(10),
        faker.random.alphaNumeric(10),
        placeMock.place_id
      ]

      
      component.ngOnInit();
      placeServiceSpy.getAllPlaces.and.returnValue(of(mockPlaces));

      console.log(component.allPlaces)
      
      expect(component.placeSaved).toBeTrue;
    });

  });

  describe('#hideDetails', () => {
    it('call methods', () => {
      component.hideDetails()
  
      expect(routerSpy.navigate).toHaveBeenCalled();
      expect(searchServiceSpy.setIsDetailOpen).toHaveBeenCalled();
      expect(mapsServiceSpy.refreshMap).toHaveBeenCalled();
      expect(placeServiceSpy.getAllPlaces).toHaveBeenCalled();
      
    });
  });

  describe('#savePlace', () => {
    it('redirect to login if not logged in', () => {
      authServiceSpy.loggedIn = false;

      component.savePlace();

      expect(authServiceSpy.login).toHaveBeenCalledWith(component.stateURL);
      
    });

    xit('save place if not saved', () => {
      authServiceSpy.loggedIn = true;
      component.placeSaved = false;
    
      fixture.detectChanges();
      component.savePlace();
      
      expect(modalServiceSpy.open).toHaveBeenCalled();
    });
  });
});


