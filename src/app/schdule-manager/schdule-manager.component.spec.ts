import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchduleManagerComponent } from './schdule-manager.component';

describe('SchduleManagerComponent', () => {
  let component: SchduleManagerComponent;
  let fixture: ComponentFixture<SchduleManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SchduleManagerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SchduleManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
