import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppingComponent } from './shopping.component';
import { RouterTestingModule } from "@angular/router/testing";

describe('ShoppingComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShoppingComponent, RouterTestingModule ]
    }).compileComponents();
  });

  it('should create', () => {
    expect([ShoppingComponent]).toBeTruthy();
  });
});
