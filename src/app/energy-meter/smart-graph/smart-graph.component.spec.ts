import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmartGraphComponent } from './smart-graph.component';

describe('SmartGraphComponent', () => {
  let component: SmartGraphComponent;
  let fixture: ComponentFixture<SmartGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SmartGraphComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SmartGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
