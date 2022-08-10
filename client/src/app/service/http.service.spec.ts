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

describe('HttpService', () => {
  let serviceHttp: HttpService;
  let httpSpy: Spy<HttpClient>;

  let mockCookieService = jasmine.createSpyObj('CookieService', ['get', 'set']);
  let mockErrorService = jasmine.createSpyObj('ErrorService', ['setError']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule, RouterTestingModule ],
      providers: [
        HttpService,
        ErrorService,
        { provide: CookieService, useValue: mockCookieService },
        { provide: ErrorService, useValue:  mockErrorService},
        { provide: HttpClient, useValue: createSpyFromClass(HttpClient) }
      ],
    }).compileComponents();

    serviceHttp = TestBed.inject(HttpService);
    httpSpy = TestBed.inject<any>(HttpClient);
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

  it('login user', (done) => {
    let user = {email: 'email@mail.test', password: 'password'}
    httpSpy.post.and.nextWith(user);
    serviceHttp.loginUser(user).subscribe(
      (res) => {
        // expect(res).to
        console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
        console.log(res)
        done()
      }, done.fail,
    )

    // serviceHttp.loginUser({email: 'email@mail.test', password: 'password'}).subscribe(
    //   () => { done() }, done.fail,
    // )
  })

  // it('login user error', (done) => {
  //   serviceHttp.loginUser({email: 'email@mail.test', password: 'password'}).subscribe(
  //     () => done.fail,
  //     () =>  done(),
  //   )
  // })

});
