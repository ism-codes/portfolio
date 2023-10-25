import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewmainComponent } from './newmain.component';

describe('NewmainComponent', () => {
  let component: NewmainComponent;
  let fixture: ComponentFixture<NewmainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewmainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewmainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
