import { TestBed } from '@angular/core/testing';

import { UserResolver } from './user.resolver';
import { RouterTestingModule } from "@angular/router/testing";
import { HttpService } from "../service/http.service";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import {CookieService} from "ngx-cookie-service";

describe('UserResolver', () => {
  let userResolver: UserResolver;
  let httpService: jasmine.SpyObj<HttpService>;
  let cookieService: jasmine.SpyObj<CookieService>;

  let spyHttpService = jasmine.createSpyObj('HttpService', [
    'getOwnProfile',
  ])

  let spyCookieService = jasmine.createSpyObj('CookieService', [
    'get', 'set',
  ])

  beforeEach((() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
      ],
      providers: [
        UserResolver,
        { provide: HttpService, useValue: spyHttpService },
        { provide: CookieService, useValue: spyCookieService },
      ],
    });

    userResolver = TestBed.inject(UserResolver);
    httpService = TestBed.inject(HttpService) as jasmine.SpyObj<HttpService>;
    cookieService = TestBed.inject(CookieService) as jasmine.SpyObj<CookieService>;
  }));

  it('should be created', () => {
    expect(userResolver).toBeDefined();
  });

  it('should return user if have token',() => {

  })

});
