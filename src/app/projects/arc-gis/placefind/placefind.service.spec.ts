import { TestBed } from '@angular/core/testing';

import { PlacefindService } from './placefind.service';

describe('PlacefindService', () => {
  let service: PlacefindService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlacefindService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
