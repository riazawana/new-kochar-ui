import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnergyMeterComponent } from './energy-meter.component';

describe('EnergyMeterComponent', () => {
  let component: EnergyMeterComponent;
  let fixture: ComponentFixture<EnergyMeterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnergyMeterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnergyMeterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
