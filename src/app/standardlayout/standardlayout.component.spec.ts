import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StandardlayoutComponent } from './standardlayout.component';

describe('StandardlayoutComponent', () => {
  let component: StandardlayoutComponent;
  let fixture: ComponentFixture<StandardlayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StandardlayoutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StandardlayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
