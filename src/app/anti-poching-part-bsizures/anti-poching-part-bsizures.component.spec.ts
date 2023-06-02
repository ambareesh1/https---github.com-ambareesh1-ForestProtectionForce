import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AntiPochingPartBSizuresComponent } from './anti-poching-part-bsizures.component';

describe('AntiPochingPartBSizuresComponent', () => {
  let component: AntiPochingPartBSizuresComponent;
  let fixture: ComponentFixture<AntiPochingPartBSizuresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AntiPochingPartBSizuresComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AntiPochingPartBSizuresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
