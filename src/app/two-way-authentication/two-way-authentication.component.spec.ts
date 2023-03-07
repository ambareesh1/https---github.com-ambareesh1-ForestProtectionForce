import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TwoWayAuthenticationComponent } from './two-way-authentication.component';

describe('TwoWayAuthenticationComponent', () => {
  let component: TwoWayAuthenticationComponent;
  let fixture: ComponentFixture<TwoWayAuthenticationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TwoWayAuthenticationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TwoWayAuthenticationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
