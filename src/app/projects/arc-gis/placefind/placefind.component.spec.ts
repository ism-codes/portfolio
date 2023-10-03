import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlacefindComponent } from './placefind.component';

describe('PlacefindComponent', () => {
  let component: PlacefindComponent;
  let fixture: ComponentFixture<PlacefindComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlacefindComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlacefindComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
