import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorySheetViewComponent } from './history-sheet-view.component';

describe('HistorySheetViewComponent', () => {
  let component: HistorySheetViewComponent;
  let fixture: ComponentFixture<HistorySheetViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistorySheetViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistorySheetViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
