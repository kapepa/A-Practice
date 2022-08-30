import {fakeAsync, TestBed} from '@angular/core/testing';

import { HttpService } from './http.service';
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { CookieService } from "ngx-cookie-service";
import { ErrorService } from "./error.service";
import { RouterTestingModule } from "@angular/router/testing";

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Spy } from "jasmine-auto-spies";
import { asyncData, asyncError } from "../../testing/async-observable-helpers";
import { DtoUser } from "../dto/dto.user";
import { DtoIngredient, DtoRecipe } from "../dto/dto.recipe";
import { DtoErrorResponse } from "../dto/dto.common";

describe('HttpService', () => {
  let serviceHttp: HttpService;
  let httpSpy: Spy<HttpClient>;

  let mockCookieService = jasmine.createSpyObj('CookieService', ['get', 'set']);
  let mockErrorService = jasmine.createSpyObj('ErrorService', ['setError']);
  let httpClientSpy = jasmine.createSpyObj('HttpClient', ['post','get', 'patch', 'delete']);

  let user = {email: 'email@mail.test', password: 'password'};

  const errorResponse = new HttpErrorResponse({
    error: 'test 404 error',
    status: 404,
    statusText: 'Not Found'
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
      ],
      providers: [
        HttpService,
        ErrorService,
        { provide: CookieService, useValue: mockCookieService },
        { provide: ErrorService, useValue:  mockErrorService},
        { provide: HttpClient, useValue: httpClientSpy }
      ],
    }).compileComponents();

    serviceHttp = TestBed.inject(HttpService);
    httpSpy = TestBed.inject(HttpClient) as Spy<HttpClient>;
  });


  it('should be created HttpModule', () => {
    expect(serviceHttp).toBeTruthy();
  });

  it('create query string', () => {
    let query = serviceHttp.createQuery({take: 5});

    expect(query).toBe('?take=5')
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

  describe('create user, createUser()', () => {
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
      httpClientSpy.post.and.returnValue(asyncData(response));

      serviceHttp.createUser(user).subscribe({
        next: (res) => {
          expect(res.create).toEqual(true);
          done();
        },
        error: (err) => done.fail,
      })
    });

    it('should be error when create user', (done: DoneFn) => {
      let user = new FormData();
      const errorResponse = new HttpErrorResponse({
        error: 'test 404 error',
        status: 404,
        statusText: 'Not Found'
      });

      httpClientSpy.post.and.returnValue(asyncError(errorResponse));

      serviceHttp.createUser(user).subscribe({
        next: () => done.fail,
        error: err => {
          expect(err).toBeTruthy();
          done();
        }
      })
    })

  })

  describe('login user, loginUser()', () => {
    it('should success login user', (done: DoneFn) => {
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
          expect(res).toEqual(response);
          done()
        },
        error: () => done.fail
      })
    })

    it('should be error when login user', (done: DoneFn) => {
      httpSpy.post.and.returnValue(asyncError(errorResponse));

      serviceHttp.loginUser(user).subscribe({
        next: () => done.fail('expected an error, not user'),
        error: (err) => {
          expect(errorResponse.status).toEqual(404);
          done();
        }
      })
    })
  })

  describe('get own profile, getOwnProfile()', () => {
    it('should get profile', (done: DoneFn) => {
      httpSpy.get.and.returnValue(asyncData({} as DtoUser))

      serviceHttp.getOwnProfile().subscribe({
        next: (data: DtoUser) => {
          expect(data).toEqual({} as DtoUser);
          done();
        },
        error: () => done.fail,
      })
    })

    it('should be error when getting profile', (done: DoneFn) => {
      httpSpy.get.and.returnValue(asyncError(errorResponse));

      serviceHttp.getOwnProfile().subscribe({
        next: () => done.fail('expected an error, not user'),
        error: (err) => {
          expect(errorResponse).toEqual(errorResponse);
          done();
        }
      })
    })
  })

  describe('get one recipe, getOneRecipe()', () => {
    it('get one recipe', (done: DoneFn) => {
      httpSpy.get.and.returnValue(asyncData({} as DtoRecipe));

      serviceHttp.getOneRecipe('id').subscribe({
        next: (recipe) => {
          expect(recipe).toEqual({} as DtoRecipe & DtoErrorResponse)
          done();
        }
      })
    })

    it('should be error when getting recipe', (done: DoneFn) => {
      httpSpy.get.and.returnValue(asyncError(errorResponse));

      serviceHttp.getOneRecipe('id').subscribe({
        next: () => done.fail('expected an error, not recipe'),
        error: (err) => {
          expect(errorResponse).toEqual(errorResponse)
          done();
        }
      })
    })
  })

  describe('get edit recipe, getEditRecipe()', () => {
    it('should get recipe for edit',(done: DoneFn) => {
      httpSpy.get.and.returnValue(asyncData({} as DtoRecipe));

      serviceHttp.getEditRecipe('id').subscribe({
        next: (recipe) => {
          expect(recipe).toEqual({} as DtoRecipe & DtoErrorResponse);
          done();
        },
        error: () => done.fail,
      })
    })

    it('should be error when getting recipe', (done: DoneFn) => {
      httpSpy.get.and.returnValue(asyncError(errorResponse));

      serviceHttp.getEditRecipe('id').subscribe({
        next: () => done.fail('expected an error, edit recipe'),
        error: (err) => {
          expect(errorResponse).toEqual(errorResponse);
          done();
        }
      })
    })
  })

  describe('get all recipe, getAllRecipe()', () => {
    it('get all recipe', (done: DoneFn) => {
      httpSpy.get.and.returnValue(asyncData([] as DtoRecipe[]));

      serviceHttp.getAllRecipe({ take: 5, skip: 5 }).subscribe({
        next: (recipe: DtoRecipe[]) => {
          expect(recipe).toEqual([] as DtoRecipe[]);
          done();
        },
        error: () => done.fail
      })
    })

    it('get all recipe error', (done: DoneFn) => {
      httpSpy.get.and.returnValue(asyncError(errorResponse));

      serviceHttp.getAllRecipe({ take: 5, skip: 5 }).subscribe({
        next: () => done.fail('expected an error, all recipe'),
        error: (err) => {
          expect(errorResponse).toEqual(errorResponse);
          done();
        }
      })
    })
  })

  describe('create recipe, createRecipe()', () => {
    it('should success create recipe', (done) => {
      httpSpy.post.and.returnValue(asyncData({} as DtoRecipe));

      serviceHttp.createRecipe({} as FormData).subscribe({
        next: (recipe: DtoRecipe & DtoErrorResponse) => {
          expect(recipe).toEqual({} as DtoRecipe & DtoErrorResponse);
          done()
        },
        error: () => done.fail
      })
    })

    it('should be error when create recipe', (done: DoneFn) => {
      httpSpy.post.and.returnValue(asyncError(errorResponse));

      serviceHttp.createRecipe({} as FormData).subscribe({
        next: () => done.fail('expected an error, create recipe'),
        error: (err) => {
          expect(errorResponse).toEqual(errorResponse);
          done()
        }
      })
    })
  })

  describe('update recipe, updateRecipe()', () => {
    it('should be success updates recipe', (done: DoneFn) => {
      httpSpy.patch.and.returnValue(asyncData({} as DtoRecipe));

      serviceHttp.updateRecipe({} as FormData).subscribe({
        next: (recipe: DtoRecipe & DtoErrorResponse) => {
          expect(recipe).toEqual({} as DtoRecipe & DtoErrorResponse);
          done();
        }
      })
    })

    it('should be error when updates recipe', (done: DoneFn) => {
      httpSpy.patch.and.returnValue(asyncError(errorResponse));

      serviceHttp.updateRecipe({} as FormData).subscribe({
        next: () => done.fail('expected an error, update recipe'),
        error: (err) => {
          expect(errorResponse).toEqual(errorResponse);
          done();
        }
      })
    })
  })

  describe('delete recipe, deleteRecipe()', () => {
    it('should be success delete recipe', (done: DoneFn) => {
      httpSpy.delete.and.returnValue(asyncData({} as { delete: boolean } & DtoErrorResponse));

      serviceHttp.deleteRecipe('id').subscribe({
        next: (res: { delete: boolean } & DtoErrorResponse) => {
          expect(res).toEqual({} as { delete: boolean } & DtoErrorResponse);
          done();
        },
        error: () => done.fail,
      })
    })

    it('should be error when delete recipe',(done: DoneFn) => {
      httpSpy.delete.and.returnValue(asyncError(errorResponse));

      serviceHttp.deleteRecipe('id').subscribe({
        next: () => done.fail('expected an error, delete recipe'),
        error: (err) => {
          expect(errorResponse).toEqual(errorResponse);
          done();
        }
      })
    })
  })

  describe('get all ingredient, getAllIngredient()', () => {
    it('should be getting all ingredient',(done: DoneFn) => {
      httpSpy.get.and.returnValue(asyncData([] as DtoIngredient[] ));

      serviceHttp.getAllIngredient({  take: 5, skip: 5 }).subscribe({
        next: (res: DtoIngredient[] & DtoErrorResponse) => {
          expect(res).toEqual([] as DtoIngredient[] )
          done()
        },
        error: () => done.fail,
      })
    })

    it('should be error when getting all ingredient', (done: DoneFn) => {
      httpSpy.get.and.returnValue(asyncError(errorResponse));

      serviceHttp.getAllIngredient({  take: 5, skip: 5 }).subscribe({
        next: () => done.fail('expected an error, get allIngredient'),
        error: (err) => {
          expect(errorResponse).toEqual(errorResponse);
          done();
        }
      })
    })
  })

  describe('create ingredient, createIngredient()', () => {
    it('should be success create ingredient', (done: DoneFn) => {
      httpSpy.post.and.returnValue(asyncData({} as DtoIngredient));

      serviceHttp.createIngredient({} as FormData).subscribe({
        next: (res: DtoIngredient & DtoErrorResponse) => {
          expect(res).toEqual({} as DtoIngredient & DtoErrorResponse);
          done()
        },
        error: () => done.fail
      })
    })

    it('should be error when create ingredient', (done: DoneFn) => {
      httpSpy.post.and.returnValue(asyncError(errorResponse));

      serviceHttp.createIngredient({} as FormData).subscribe({
        next: () => done.fail('expected an error, create ingredient'),
        error: (err) => {
          expect(errorResponse).toEqual(errorResponse);
          done();
        }
      })
    })
  })

  describe('update ingredient, updateIngredient()', () => {
    it('should be success update ingredient',(done: DoneFn) => {
      httpSpy.patch.and.returnValue(asyncData({} as DtoIngredient));

      serviceHttp.updateIngredient({} as FormData).subscribe({
        next: (res: DtoIngredient & DtoErrorResponse) => {
          expect(res).toEqual({} as DtoIngredient & DtoErrorResponse)
          done()
        },
        error: () => done.fail,
      })
    })

    it('should be error when update ingredient', (done: DoneFn) => {
      httpSpy.patch.and.returnValue(asyncError(errorResponse));

      serviceHttp.updateIngredient({} as FormData).subscribe({
        next: () => done.fail('expected an error, update ingredient'),
        error: (err) => {
          expect(err).toBeTruthy();
          done();
        }
      })
    })
  })

  describe('delete ingredient, deleteIngredient()', () => {
    it('should be success delete ingredient', (done: DoneFn) => {
      httpSpy.delete.and.returnValue(asyncData( {} as { delete: boolean } & DtoErrorResponse));

      serviceHttp.deleteIngredient('id').subscribe({
        next: (res: { delete: boolean } & DtoErrorResponse) => {
          expect(res).toEqual({} as { delete: boolean } & DtoErrorResponse);
          done();
        },
        error: () => done.fail
      })
    })

    it('should be error when delete ingredient', (done: DoneFn) => {
      httpSpy.delete.and.returnValue(asyncError(errorResponse));

      serviceHttp.deleteIngredient('id').subscribe({
        next: () => done.fail('expected an error, delete ingredient'),
        error: (err) => {
          expect(err).toBeTruthy();
          done()
        }
      })
    })
  })
});
