import { TestBed } from '@angular/core/testing';

import { VersusserviceService } from './versusservice.service';

describe('VersusserviceService', () => {
  let service: VersusserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VersusserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
