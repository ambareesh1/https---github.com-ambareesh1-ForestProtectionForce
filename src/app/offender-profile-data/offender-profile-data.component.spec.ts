import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OffenderProfileDataComponent } from './offender-profile-data.component';

describe('OffenderProfileDataComponent', () => {
  let component: OffenderProfileDataComponent;
  let fixture: ComponentFixture<OffenderProfileDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OffenderProfileDataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OffenderProfileDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
