import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HabitualForestOffendersComponent } from './habitual-forest-offenders.component';

describe('HabitualForestOffendersComponent', () => {
  let component: HabitualForestOffendersComponent;
  let fixture: ComponentFixture<HabitualForestOffendersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HabitualForestOffendersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HabitualForestOffendersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
