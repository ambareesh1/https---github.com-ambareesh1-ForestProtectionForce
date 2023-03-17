import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageCompartmentComponent } from './manage-compartment.component';

describe('ManageCompartmentComponent', () => {
  let component: ManageCompartmentComponent;
  let fixture: ComponentFixture<ManageCompartmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageCompartmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageCompartmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
