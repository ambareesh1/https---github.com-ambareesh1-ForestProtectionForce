import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisposedComponent } from './disposed.component';

describe('DisposedComponent', () => {
  let component: DisposedComponent;
  let fixture: ComponentFixture<DisposedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisposedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisposedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
