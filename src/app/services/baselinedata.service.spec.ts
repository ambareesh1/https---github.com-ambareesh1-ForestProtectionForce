import { TestBed } from '@angular/core/testing';

import { BaselinedataService } from './baselinedata.service';

describe('BaselinedataService', () => {
  let service: BaselinedataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BaselinedataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
