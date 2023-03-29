import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageUserTypesComponent } from './manage-user-types.component';

describe('ManageUserTypesComponent', () => {
  let component: ManageUserTypesComponent;
  let fixture: ComponentFixture<ManageUserTypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageUserTypesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageUserTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
