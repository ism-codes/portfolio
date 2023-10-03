import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentprojectsComponent } from './currentprojects.component';

describe('CurrentprojectsComponent', () => {
  let component: CurrentprojectsComponent;
  let fixture: ComponentFixture<CurrentprojectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CurrentprojectsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentprojectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
