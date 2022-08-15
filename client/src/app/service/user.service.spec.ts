import { inject, TestBed } from '@angular/core/testing';

import { UserService } from './user.service';
import { RouterTestingModule } from "@angular/router/testing";
import { HttpService } from "./http.service";
import { SpinnerService } from "./spinner.service";
import { CookieService } from "ngx-cookie-service";
import { DtoErrorResponse } from "../dto/dto.common";
import { of } from "rxjs";
import { ActivatedRoute, Router } from "@angular/router";
import { RecipesModule } from "../shared/recipes/recipes.module";
import { Location } from "@angular/common";
import {DtoUser} from "../dto/dto.user";
import {RecipeDetailComponent} from "../shared/recipe-detail/recipe-detail.component";

describe('UserService', () => {
  let location: Location
  let router: Router;
  let userService: UserService;
  let activatedRoute: ActivatedRoute;
  let httpService: jasmine.SpyObj<HttpService>;
  let cookieService: jasmine.SpyObj<CookieService>;
  let spinnerService: jasmine.SpyObj<SpinnerService>;

  let spyHttpService = jasmine.createSpyObj('HttpService', [
    'createUser', 'loginUser', 'getOwnProfile',
  ])
  let spyCookieService = jasmine.createSpyObj('CookieService', [
    'get', 'set', 'delete'
  ])
  let spySpinnerService = jasmine.createSpyObj('SpinnerService', [
    'changeState',
  ])

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([
        { path: 'recipe', component: RecipesModule },
        { path: '', component: RecipeDetailComponent }
      ])],
      providers: [
        UserService,
        { provide: HttpService, useValue: spyHttpService },
        { provide: CookieService, useValue: spyCookieService },
        { provide: SpinnerService, useValue: spySpinnerService },
        { provide: ActivatedRoute, useValue: { queryParams: of({login: 'login'}) }},
      ],
    }).compileComponents();

    location = TestBed.inject(Location)
    router = TestBed.inject(Router);
    userService = TestBed.inject(UserService);
    activatedRoute = TestBed.inject(ActivatedRoute);
    httpService = TestBed.inject(HttpService) as jasmine.SpyObj<HttpService>;
    cookieService = TestBed.inject(CookieService) as jasmine.SpyObj<CookieService>;
    spinnerService = TestBed.inject(SpinnerService) as jasmine.SpyObj<SpinnerService>;

    router.initialNavigation()
  });

  it('should create service on name UserService', () => {
    expect(userService).toBeTruthy();
  });

  it('create user', () => {
    httpService.createUser.and.returnValue( of( {create: true} as {create: boolean} & DtoErrorResponse ));
    userService.createUser({} as FormData, () => {});

    expect(spinnerService.changeState).toHaveBeenCalled();
    expect(httpService.createUser).toHaveBeenCalled();

    activatedRoute.queryParams.subscribe((value) => {
      expect(value).toEqual({ login: 'login' })
    })

    expect(spinnerService.changeState).toHaveBeenCalled();
  })

  it('should login user', () => {
    expect(spinnerService.changeState).toHaveBeenCalled();
    httpService.loginUser.and.returnValue( of({access_token: 'token'} as {access_token: string} & DtoErrorResponse));

    router.navigate(['recipe']).then(() => {
      expect(location.path()).toEqual('/recipe');
      expect(spinnerService.changeState).toHaveBeenCalled();
    });

    httpService.getOwnProfile.and.returnValue(of( {} as  DtoUser));
    userService.getUser();
    expect(userService.user).toEqual({} as DtoUser);
  });

  it('should get user', () => {
    httpService.getOwnProfile.and.returnValue(of( {} as  DtoUser));
    userService.getUser();
    expect(userService.user).toEqual({} as DtoUser)
  });

  it('should set user', () => {
    userService.setUser({} as DtoUser);

    expect(userService.user).toEqual({} as DtoUser);
  })

  it('should logoutUser', () => {
    userService.logoutUser();
    expect(userService.user).toEqual({} as DtoUser);
    expect(cookieService.delete.and.returnValue(undefined)).toBeTruthy()

    router.navigate(['']).then(() => {
      expect(location.path()).toEqual('/')
    })
  })

});
