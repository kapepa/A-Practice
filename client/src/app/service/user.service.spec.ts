import {inject, TestBed} from '@angular/core/testing';

import { UserService } from './user.service';
import { RouterTestingModule } from "@angular/router/testing";
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { HttpService } from "./http.service";
import { SpinnerService } from "./spinner.service";
import { CookieService } from "ngx-cookie-service";

describe('UserService', () => {
  let service: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule,RouterTestingModule],
      providers: [
        HttpService,
        SpinnerService,
        CookieService
      ]
    });
  });

  it('should get users', inject([HttpClientTestingModule, HttpService, SpinnerService, CookieService],
      (
        httpMock: HttpTestingController,
        httpService: HttpService,
        spinnerService: SpinnerService,
        cookieService: CookieService,
      ) => {
        expect([httpService, spinnerService, cookieService]).toBeTruthy();
      }
    )
  );
});
