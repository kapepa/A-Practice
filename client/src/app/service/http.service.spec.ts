import { TestBed } from '@angular/core/testing';

import { HttpService } from './http.service';
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { CookieService } from "ngx-cookie-service";
import { ErrorService } from "./error.service";
import { Router } from "@angular/router";
import {RouterTestingModule} from "@angular/router/testing";

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Spy } from "jasmine-auto-spies";
import { of } from "rxjs";
import {asyncData, asyncError} from "../../testing/async-observable-helpers";

describe('HttpService', () => {
  let serviceHttp: HttpService;
  let httpSpy: Spy<HttpClient>;

  let mockCookieService = jasmine.createSpyObj('CookieService', ['get', 'set']);
  let mockErrorService = jasmine.createSpyObj('ErrorService', ['setError']);
  let mockHttpClient = jasmine.createSpyObj('HttpClient', ['post']);

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

  it('create user', (done: DoneFn) => {
    let user = new FormData();
    let response = {
      create: true,
      status: 200,
      response: {
        statusCode: 200,
        message: 'success',
      }
    };
    httpSpy.post.and.returnValue(of(response));

    serviceHttp.createUser(user).subscribe({
      next: (res) => {
        expect(res).toEqual(response);
        done();
;      },
      error: (err) => {
        expect(serviceHttp.handleError(err)).toThrowError();
        done();
      }
    })

  })

  it('login user', (done: DoneFn) => {
    let user = {email: 'email@mail.test', password: 'password'};
    let response = {
      access_token: 'SomeString',
      status: 200,
      response: {
        statusCode: 200,
        message: 'success',
      }
    };

    httpSpy.post.and.returnValue(asyncData(response));
    serviceHttp.loginUser(user).subscribe({
      next: (res) => {
        expect(res).toEqual(response)
        done()
      },
      error: () => {
        done.fail
      }
    })
  })

  it('login user error', (done: DoneFn) => {
    let user = {email: 'email@mail.test', password: 'password'};

    const errorResponse = new HttpErrorResponse({
      error: 'test 404 error',
      status: 404,
      statusText: 'Not Found'
    });

    httpSpy.post.and.returnValue(asyncError(errorResponse));

    serviceHttp.loginUser(user).subscribe({
      next: () => done.fail('expected an error, not user'),
      error: (err) => {
        expect(errorResponse.status).toEqual(404);
        done();
      }
    })
  })


});
