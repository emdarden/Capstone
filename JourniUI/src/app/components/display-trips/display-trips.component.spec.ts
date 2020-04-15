import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayTripsComponent } from './display-trips.component';

describe('DisplayTripsComponent', () => {
  let component: DisplayTripsComponent;
  let fixture: ComponentFixture<DisplayTripsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayTripsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayTripsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
