import { TestBed } from '@angular/core/testing';

import {RouterTestingModule} from "@angular/router/testing";
import {HomeComponent} from "./home.component";

describe('HomeComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeComponent, RouterTestingModule ]
    }).compileComponents();
  });

  it('should create', () => {
    expect([HomeComponent]).toBeTruthy();
  });
});
