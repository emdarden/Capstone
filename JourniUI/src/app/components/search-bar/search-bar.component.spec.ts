import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchBarComponent } from './search-bar.component';
import { Router } from '@angular/router';
import * as faker from 'faker';

describe('SearchBarComponent', () => {
  let component: SearchBarComponent;
  let fixture: ComponentFixture<SearchBarComponent>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async(() => {
    routerSpy = jasmine.createSpyObj(['navigate']);
   
    TestBed.configureTestingModule({
      declarations: [ SearchBarComponent ],
      providers: [
        {provide: Router, useValue: routerSpy}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('#getSearchResults', () => {
    xit('navigate to search results', () => {
      const query = faker.random.word;

      component.getSearchResults(query)

      expect(routerSpy.navigate).toHaveBeenCalled();
    });
  });
});
