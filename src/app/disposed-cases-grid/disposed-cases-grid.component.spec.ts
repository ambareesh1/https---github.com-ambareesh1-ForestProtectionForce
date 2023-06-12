import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisposedCasesGridComponent } from './disposed-cases-grid.component';

describe('DisposedCasesGridComponent', () => {
  let component: DisposedCasesGridComponent;
  let fixture: ComponentFixture<DisposedCasesGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisposedCasesGridComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisposedCasesGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
