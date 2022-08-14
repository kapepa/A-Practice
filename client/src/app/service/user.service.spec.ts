import {inject, TestBed} from '@angular/core/testing';

import { UserService } from './user.service';
import { RouterTestingModule } from "@angular/router/testing";
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { HttpService } from "./http.service";
import { SpinnerService } from "./spinner.service";
import { CookieService } from "ngx-cookie-service";

describe('SpinnerService', () => {
  let spinnerService: SpinnerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        SpinnerService,
      ]
    }).compileComponents();

    spinnerService = TestBed.inject(SpinnerService);
  });

  it('should create httpService', () => {
    expect(spinnerService).toBeTruthy();
  });

  it('change state', () => {
    spinnerService.changeState();

    expect(spinnerService.spinner$).toEqual(true)
  })

});
