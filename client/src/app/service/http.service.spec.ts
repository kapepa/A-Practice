import { TestBed } from '@angular/core/testing';

import { HttpService } from './http.service';
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { CookieService } from "ngx-cookie-service";
import { ErrorService } from "./error.service";
import { Router } from "@angular/router";
import {ErrorComponent} from "../page/error/error.component";
import {RouterTestingModule} from "@angular/router/testing";

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {createSpyFromClass, Spy} from "jasmine-auto-spies";
import {DtoErrorResponse} from "../dto/dto.common";
import {of, throwError} from "rxjs";

describe('HttpService', () => {
  let serviceHttp: HttpService;
  let httpSpy: Spy<HttpClient>;

  let mockCookieService = jasmine.createSpyObj('CookieService', ['get', 'set']);
  let mockErrorService = jasmine.createSpyObj('ErrorService', ['setError']);
  let mockHttpClient = jasmine.createSpyObj('HttpClient', ['post']);

  let user = {email: 'email@mail.test', password: 'password'};
  let response = {
    access_token: 'SomeString',
    status: 200,
    response: {
      statusCode: 200,
      message: 'success',
    }
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule, RouterTestingModule ],
      providers: [
        HttpService,
        ErrorService,
        { provide: CookieService, useValue: mockCookieService },
        { provide: ErrorService, useValue:  mockErrorService},
        { provide: HttpClient, useValue: mockHttpClient }
      ],
    }).compileComponents();

    serviceHttp = TestBed.inject(HttpService);
    httpSpy = TestBed.inject(HttpClient) as Spy<HttpClient>;
  });

  it('should be created HttpModule', () => {
    expect(serviceHttp).toBeTruthy();
  });

  it('create query string', () => {
    const query = serviceHttp.createQuery({take: 5});
    return expect(query).toBe('?take=5')
  });

  it('set token in cookie', () => {
    let cookie = mockCookieService.set.and.returnValue(true)
    expect(cookie).toBeTruthy();
  })

  it('invoke popup error', () => {
    mockErrorService.setError.and.returnValue();
    let error = serviceHttp.clientError( { statusCode: 400, message: 'message error' })
    return expect(error).toBeUndefined();
  })

  // it('create user', (done: DoneFn) => {
  //
  // })

  it('login user', (done: DoneFn) => {
    httpSpy.post.and.returnValue(of(response));
    serviceHttp.loginUser(user).subscribe({
      next: (res) => {
        expect(res).toEqual(response)
        done()
      },
      error: (err) => {
        expect(serviceHttp.handleError(err)).toThrowError();
        done()
      }
    })
  })

});
