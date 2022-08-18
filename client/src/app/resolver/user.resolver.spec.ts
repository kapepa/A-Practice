import { TestBed } from '@angular/core/testing';

import { UserResolver } from './user.resolver';
import { RouterTestingModule } from "@angular/router/testing";
import { HttpService } from "../service/http.service";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import {CookieService} from "ngx-cookie-service";
import {of} from "rxjs";
import {ActivatedRouteSnapshot} from "@angular/router";
import {DtoUser} from "../dto/dto.user";

describe('UserResolver', () => {
  let userResolver: UserResolver;
  let httpService: jasmine.SpyObj<HttpService>;
  let cookieService: jasmine.SpyObj<CookieService>;

  let spyHttpService = jasmine.createSpyObj('HttpService', [
    'getOwnProfile',
  ])

  let spyCookieService = jasmine.createSpyObj('CookieService', [
    'get', null, undefined
  ])

  let mock = <T, P extends keyof T>(obj: Pick<T, P>): T => obj as T;

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
    let currentToken = 'some_token';
    let profile = {id: 'myID', name: 'myName'} as DtoUser;
    cookieService.get.and.returnValue(currentToken);
    httpService.getOwnProfile.and.returnValue(of(profile))

    let route = mock<ActivatedRouteSnapshot, 'params'>({
      params: {},
    });

    userResolver.resolve(route);
    expect(userResolver.token).toEqual(currentToken);
    expect(httpService.getOwnProfile).toHaveBeenCalled()
  })

  it('should return empty object DtoUser', () => {
    cookieService.get.and.returnValue('')

    let route = mock<ActivatedRouteSnapshot, 'params'>({
      params: {},
    });

    userResolver.resolve(route)
    expect(userResolver.token).toEqual('');
  })

});
