import { TestBed } from '@angular/core/testing';

import { HttpService } from './http.service';
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { CookieService } from "ngx-cookie-service";
import { ErrorService } from "./error.service";
import { Router } from "@angular/router";
import {ErrorComponent} from "../page/error/error.component";
import {RouterTestingModule} from "@angular/router/testing";
import {DtoQuery} from "../dto/dto.query";

describe('HttpService', () => {
  let serviceHttp: HttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [ HttpService ],
    }).compileComponents();

    serviceHttp = TestBed.inject(HttpService);
  });

  it('should be created HttpModule', () => {
    expect(serviceHttp).toBeTruthy();
  });

  it('create query string', () => {
    const query = serviceHttp.createQuery({take: 5});
    return expect(query).toBe('?take=5')
  });

});
