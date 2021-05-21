import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Extra2Component } from './extra2.component';

describe('Extra2Component', () => {
  let component: Extra2Component;
  let fixture: ComponentFixture<Extra2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Extra2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Extra2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
