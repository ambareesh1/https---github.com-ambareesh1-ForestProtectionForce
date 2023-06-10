import { TestBed } from '@angular/core/testing';

import { HistorysheetService } from './historysheet.service';

describe('HistorysheetService', () => {
  let service: HistorysheetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HistorysheetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
