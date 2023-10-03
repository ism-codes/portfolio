import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FutureprojectsComponent } from './futureprojects.component';

describe('FutureprojectsComponent', () => {
  let component: FutureprojectsComponent;
  let fixture: ComponentFixture<FutureprojectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FutureprojectsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FutureprojectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
