import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavComponent } from './nav.component';
import { AuthService } from 'src/app/services/auth.service';
import { Router, RouterState } from '@angular/router';
import * as faker from 'faker';

describe('NavComponent', () => {
  let component: NavComponent;
  let fixture: ComponentFixture<NavComponent>;
  let authSpy;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async(() => {
    routerSpy = jasmine.createSpyObj(['navigate'], {routerState: { snapshot: { url: faker.internet.url }}});
    authSpy = jasmine.createSpy();

    TestBed.configureTestingModule({
      declarations: [ NavComponent ],
      providers: [
        {provide: AuthService, useValue: authSpy},
        {provide: Router, useValue: routerSpy}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavComponent);
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
  });

  describe('#showTrips', () => {
    it('navigate to trips', () => {
      component.showTrips();

      expect(routerSpy.navigate).toHaveBeenCalled(); 
    });
  });
});
