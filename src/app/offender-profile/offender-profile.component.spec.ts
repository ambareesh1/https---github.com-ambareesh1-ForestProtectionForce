import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OffenderProfileComponent } from './offender-profile.component';

describe('OffenderProfileComponent', () => {
  let component: OffenderProfileComponent;
  let fixture: ComponentFixture<OffenderProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OffenderProfileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OffenderProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
