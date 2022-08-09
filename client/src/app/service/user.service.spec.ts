import {inject, TestBed} from '@angular/core/testing';

import { UserService } from './user.service';
import { RouterTestingModule } from "@angular/router/testing";
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { HttpService } from "./http.service";
import { SpinnerService } from "./spinner.service";
import { CookieService } from "ngx-cookie-service";

describe('UserService', () => {
  let httpMock: HttpTestingController;
  let httpService: HttpService;
  let spinnerService: SpinnerService;
  let cookieService: CookieService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule,RouterTestingModule],
      providers: [
        HttpService,
        SpinnerService,
        CookieService
      ]
    }).compileComponents();

    httpService = TestBed.inject(HttpService);
    spinnerService = TestBed.inject(SpinnerService);
    cookieService = TestBed.inject(CookieService);
  });

  it('include dependencies', () => {});

});
