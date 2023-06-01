import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComplaintsRegisteredComponent } from './complaints-registered.component';

describe('ComplaintsRegisteredComponent', () => {
  let component: ComplaintsRegisteredComponent;
  let fixture: ComponentFixture<ComplaintsRegisteredComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComplaintsRegisteredComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComplaintsRegisteredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
