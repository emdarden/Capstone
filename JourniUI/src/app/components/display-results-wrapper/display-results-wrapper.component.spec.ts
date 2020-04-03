import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayResultsWrapperComponent } from './display-results-wrapper.component';

describe('DisplayResultsWrapperComponent', () => {
  let component: DisplayResultsWrapperComponent;
  let fixture: ComponentFixture<DisplayResultsWrapperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayResultsWrapperComponent ]
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
