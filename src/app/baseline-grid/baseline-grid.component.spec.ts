import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaselineGridComponent } from './baseline-grid.component';

describe('BaselineGridComponent', () => {
  let component: BaselineGridComponent;
  let fixture: ComponentFixture<BaselineGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BaselineGridComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BaselineGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
