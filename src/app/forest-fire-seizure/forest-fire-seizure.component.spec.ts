import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForestFireSeizureComponent } from './forest-fire-seizure.component';

describe('ForestFireSeizureComponent', () => {
  let component: ForestFireSeizureComponent;
  let fixture: ComponentFixture<ForestFireSeizureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForestFireSeizureComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ForestFireSeizureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
