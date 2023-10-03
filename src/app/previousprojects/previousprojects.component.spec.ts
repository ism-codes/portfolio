import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviousprojectsComponent } from './previousprojects.component';

describe('PreviousprojectsComponent', () => {
  let component: PreviousprojectsComponent;
  let fixture: ComponentFixture<PreviousprojectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreviousprojectsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreviousprojectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
