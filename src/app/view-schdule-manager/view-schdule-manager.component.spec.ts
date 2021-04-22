import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSchduleManagerComponent } from './view-schdule-manager.component';

describe('ViewSchduleManagerComponent', () => {
  let component: ViewSchduleManagerComponent;
  let fixture: ComponentFixture<ViewSchduleManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewSchduleManagerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewSchduleManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
