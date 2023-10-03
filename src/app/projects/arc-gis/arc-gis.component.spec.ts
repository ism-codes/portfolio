import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArcGISComponent } from './arc-gis.component';

describe('ArcGISComponent', () => {
  let component: ArcGISComponent;
  let fixture: ComponentFixture<ArcGISComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArcGISComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArcGISComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
