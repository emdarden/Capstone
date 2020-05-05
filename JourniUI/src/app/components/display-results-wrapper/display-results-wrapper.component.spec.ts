import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayResultsWrapperComponent } from './display-results-wrapper.component';
import { ActivatedRoute, Router } from '@angular/router';
import { SearchResultsService } from 'src/app/services/search-results.service';
import { MapsService } from 'src/app/services/maps.service';
import { of, Subject } from 'rxjs';

describe('DisplayResultsWrapperComponent', () => {
  let component: DisplayResultsWrapperComponent;
  let fixture: ComponentFixture<DisplayResultsWrapperComponent>;
  let mockSearchResultsService: jasmine.SpyObj<SearchResultsService>;
  let mockMapsService: jasmine.SpyObj<MapsService>;
  let mockQueryParamMap;

  // const mockActivatedRoute = {snapshot: { queryParams: {query: "paris"}}}
  // const mockActivatedRoute ={queryParamMap: mockQueryParamMap}
  const routerMock = {
    navigate: jasmine.createSpy('navigate'),
  }
  beforeEach(async(() => {
    
    mockQueryParamMap = jasmine.createSpyObj(['queryParams'])
    mockMapsService = jasmine.createSpyObj(['initMap', 'getMapStatus', 'removeMarkers', 'setMapStatus']);
    mockMapsService.getMapStatus.and.returnValue(new Subject);
    
    const mockActivatedRoute = {queryParamMap: mockQueryParamMap}
    
    mockSearchResultsService = jasmine.createSpyObj(['setSearchResults', 'getIsDetailOpen', 'setIsDetailOpen']);
    
    TestBed.configureTestingModule({
      declarations: [ DisplayResultsWrapperComponent ],
      providers: [
        {provide: ActivatedRoute, useValue: mockActivatedRoute},
        {provide: SearchResultsService, useValue: mockSearchResultsService},
        {provide: MapsService, useValue: mockMapsService},
        {provide: Router, useValue: routerMock}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayResultsWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
}); 
