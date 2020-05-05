import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { Router } from '@angular/router';
import * as sinon from 'sinon';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let mockRouter;

  beforeEach(async(() => {
    mockRouter = sinon.createStubInstance(Router);
    
    TestBed.configureTestingModule({
      declarations: [ HeaderComponent ],
      providers: [
        {provide: Router, useValue: mockRouter}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('#homeSearch', () => {
    it('should navigate to search', () => {
      const navigateSpy = spyOn(mockRouter, 'navigate');

      component.homeSearch();

      expect(navigateSpy).toHaveBeenCalled();
    })
  });
});
