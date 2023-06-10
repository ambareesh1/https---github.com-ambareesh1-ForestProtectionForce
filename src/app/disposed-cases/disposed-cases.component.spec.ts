import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisposedCasesComponent } from './disposed-cases.component';

describe('DisposedCasesComponent', () => {
  let component: DisposedCasesComponent;
  let fixture: ComponentFixture<DisposedCasesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisposedCasesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisposedCasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
