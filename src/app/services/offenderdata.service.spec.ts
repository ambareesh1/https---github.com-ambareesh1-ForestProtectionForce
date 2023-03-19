import { TestBed } from '@angular/core/testing';

import { OffenderdataService } from './offenderdata.service';

describe('OffenderdataService', () => {
  let service: OffenderdataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OffenderdataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
