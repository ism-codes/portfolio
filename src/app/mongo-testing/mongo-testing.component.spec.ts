import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MongoTestingComponent } from './mongo-testing.component';

describe('MongoTestingComponent', () => {
  let component: MongoTestingComponent;
  let fixture: ComponentFixture<MongoTestingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MongoTestingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MongoTestingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
