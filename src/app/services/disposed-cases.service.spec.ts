import { TestBed } from '@angular/core/testing';

import { DisposedCasesService } from './disposed-cases.service';

describe('DisposedCasesService', () => {
  let service: DisposedCasesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DisposedCasesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
