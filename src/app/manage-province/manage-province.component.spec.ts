import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageProvinceComponent } from './manage-province.component';

describe('ManageProvinceComponent', () => {
  let component: ManageProvinceComponent;
  let fixture: ComponentFixture<ManageProvinceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageProvinceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageProvinceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
