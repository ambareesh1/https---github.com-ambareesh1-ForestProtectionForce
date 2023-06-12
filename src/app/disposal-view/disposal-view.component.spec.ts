import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisposalViewComponent } from './disposal-view.component';

describe('DisposalViewComponent', () => {
  let component: DisposalViewComponent;
  let fixture: ComponentFixture<DisposalViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisposalViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisposalViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
