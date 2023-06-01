import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AntiPochingPartAActivityComponent } from './anti-poching-part-aactivity.component';

describe('AntiPochingPartAActivityComponent', () => {
  let component: AntiPochingPartAActivityComponent;
  let fixture: ComponentFixture<AntiPochingPartAActivityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AntiPochingPartAActivityComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AntiPochingPartAActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
