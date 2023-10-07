import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabGroupsComponent } from './tab-groups.component';

describe('TabGroupsComponent', () => {
  let component: TabGroupsComponent;
  let fixture: ComponentFixture<TabGroupsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TabGroupsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TabGroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
