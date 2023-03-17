import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageCircleComponent } from './manage-circle.component';

describe('ManageCircleComponent', () => {
  let component: ManageCircleComponent;
  let fixture: ComponentFixture<ManageCircleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageCircleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageCircleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
