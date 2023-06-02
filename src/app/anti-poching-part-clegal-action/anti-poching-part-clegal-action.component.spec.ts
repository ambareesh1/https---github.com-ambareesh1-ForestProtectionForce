import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AntiPochingPartCLegalActionComponent } from './anti-poching-part-clegal-action.component';

describe('AntiPochingPartCLegalActionComponent', () => {
  let component: AntiPochingPartCLegalActionComponent;
  let fixture: ComponentFixture<AntiPochingPartCLegalActionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AntiPochingPartCLegalActionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AntiPochingPartCLegalActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
