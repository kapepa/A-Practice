import {inject, TestBed} from '@angular/core/testing';

import { AuthComponent } from './auth.component';
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { RouterTestingModule } from "@angular/router/testing";

describe('AuthComponent', () => {

  beforeEach((() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [AuthComponent],
    }).compileComponents();
  }));

  it('should create', () => {
    expect([AuthComponent]).toBeTruthy();
  });
});
