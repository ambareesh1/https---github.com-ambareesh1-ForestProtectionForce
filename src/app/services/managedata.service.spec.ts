import { TestBed } from '@angular/core/testing';

import { ManagedataService } from './managedata.service';

describe('ManagedataService', () => {
  let service: ManagedataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManagedataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
