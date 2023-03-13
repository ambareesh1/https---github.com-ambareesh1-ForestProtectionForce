import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaselineDataComponent } from './baseline-data.component';

describe('BaselineDataComponent', () => {
  let component: BaselineDataComponent;
  let fixture: ComponentFixture<BaselineDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BaselineDataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BaselineDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
