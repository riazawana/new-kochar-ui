import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditEscalationUserModalComponent } from './edit-escalation-user-modal.component';

describe('EditEscalationUserModalComponent', () => {
  let component: EditEscalationUserModalComponent;
  let fixture: ComponentFixture<EditEscalationUserModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditEscalationUserModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditEscalationUserModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
