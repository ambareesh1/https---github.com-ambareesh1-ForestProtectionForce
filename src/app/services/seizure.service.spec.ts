import { TestBed } from '@angular/core/testing';

import { SeizureService } from './seizure.service';

describe('SeizureService', () => {
  let service: SeizureService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SeizureService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
