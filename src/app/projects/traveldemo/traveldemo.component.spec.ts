import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TraveldemoComponent } from './traveldemo.component';

describe('TraveldemoComponent', () => {
  let component: TraveldemoComponent;
  let fixture: ComponentFixture<TraveldemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TraveldemoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TraveldemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
