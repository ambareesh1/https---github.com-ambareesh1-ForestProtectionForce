import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorySheetDataComponent } from './history-sheet-data.component';

describe('HistorySheetDataComponent', () => {
  let component: HistorySheetDataComponent;
  let fixture: ComponentFixture<HistorySheetDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistorySheetDataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistorySheetDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
