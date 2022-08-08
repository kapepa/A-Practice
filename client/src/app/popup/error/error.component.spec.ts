import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorComponent } from './error.component';
import { RouterTestingModule } from "@angular/router/testing";

describe('ErrorComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ErrorComponent ]
    }).compileComponents();
  });

  it('should create', () => {
    expect([ErrorComponent]).toBeTruthy();
  });
});
