import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DragPlaceComponent } from './drag-place.component';

describe('DragPlaceComponent', () => {
  let component: DragPlaceComponent;
  let fixture: ComponentFixture<DragPlaceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DragPlaceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DragPlaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
