import { TestBed } from '@angular/core/testing';

import {RouterTestingModule} from "@angular/router/testing";
import {CreateComponent} from "./create.component";

describe('HomeComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateComponent, RouterTestingModule ]
    }).compileComponents();
  });

  it('should create', () => {
    expect([CreateComponent]).toBeTruthy();
  });
});
