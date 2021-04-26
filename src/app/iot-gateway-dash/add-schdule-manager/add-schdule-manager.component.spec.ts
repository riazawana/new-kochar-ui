import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSchduleManagerComponent } from './add-schdule-manager.component';

describe('AddSchduleManagerComponent', () => {
  let component: AddSchduleManagerComponent;
  let fixture: ComponentFixture<AddSchduleManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddSchduleManagerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSchduleManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
