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
  let mockHttpClient = jasmine.createSpyObj('HttpClient', ['post','get', 'patch', 'delete']);

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
    httpSpy.post.and.returnValue(asyncData(response));

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

  it('create user error', (done: DoneFn) => {
    let user = new FormData();
    const errorResponse = new HttpErrorResponse({
      error: 'test 404 error',
      status: 404,
      statusText: 'Not Found'
    });

    httpSpy.post.and.returnValue(asyncData(errorResponse));

    serviceHttp.createUser(user).subscribe({
      next: (res) => {
        expect(errorResponse).toEqual(errorResponse);
        done();
        },
      error: (err) => {
        expect(serviceHttp.handleError(err)).toThrowError();
        done();
      }
    })
  })

  it('login user', (done: DoneFn) => {
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
    httpSpy.post.and.returnValue(asyncError(errorResponse));

    serviceHttp.loginUser(user).subscribe({
      next: () => done.fail('expected an error, not user'),
      error: (err) => {
        expect(errorResponse.status).toEqual(404);
        done();
      }
    })
  })

  it('get own profile', (done: DoneFn) => {
    httpSpy.get.and.returnValue(asyncData({} as DtoUser))

    serviceHttp.getOwnProfile().subscribe({
      next: (data: DtoUser) => {
        expect(data).toEqual({} as DtoUser);
        done();
      },
      error: () => done.fail,
    })
  })

  it('get own profile error', (done: DoneFn) => {
    httpSpy.get.and.returnValue(asyncError(errorResponse));

    serviceHttp.getOwnProfile().subscribe({
      next: () => done.fail('expected an error, not user'),
      error: (err) => {
        expect(errorResponse).toEqual(errorResponse);
        done();
      }
    })
  })

  it('get one recipe', (done: DoneFn) => {
    httpSpy.get.and.returnValue(asyncData({} as DtoRecipe));

    serviceHttp.getOneRecipe('id').subscribe({
      next: (recipe) => {
        expect(recipe).toEqual({} as DtoRecipe & DtoErrorResponse)
        done();
      }
    })
  })

  it('get one recipe error', (done: DoneFn) => {
    httpSpy.get.and.returnValue(asyncError(errorResponse));

    serviceHttp.getOneRecipe('id').subscribe({
      next: () => done.fail('expected an error, not recipe'),
      error: (err) => {
        expect(errorResponse).toEqual(errorResponse)
        done();
      }
    })
  })

  it('should edit recipe',(done: DoneFn) => {
    httpSpy.get.and.returnValue(asyncData({} as DtoRecipe));

    serviceHttp.getEditRecipe('id').subscribe({
      next: (recipe) => {
        expect(recipe).toEqual({} as DtoRecipe & DtoErrorResponse);
        done();
      },
      error: () => done.fail,
    })
  })

  it('edit recipe error', (done: DoneFn) => {
    httpSpy.get.and.returnValue(asyncError(errorResponse));

    serviceHttp.getEditRecipe('id').subscribe({
      next: () => done.fail('expected an error, edit recipe'),
      error: (err) => {
        expect(errorResponse).toEqual(errorResponse);
        done();
      }
    })
  })

  it('get all recipe', (done: DoneFn) => {
    httpSpy.get.and.returnValue(asyncData([] as DtoRecipe[]))

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

  it('create recipe', (done) => {
    httpSpy.post.and.returnValue(asyncData({} as DtoRecipe));

    serviceHttp.createRecipe({} as FormData).subscribe({
      next: (recipe: DtoRecipe & DtoErrorResponse) => {
        expect(recipe).toEqual({} as DtoRecipe & DtoErrorResponse);
        done()
      },
      error: () => done.fail
    })
  })

  it('create recipe error', (done: DoneFn) => {
    httpSpy.post.and.returnValue(asyncError(errorResponse));

    serviceHttp.createRecipe({} as FormData).subscribe({
      next: () => done.fail('expected an error, create recipe'),
      error: (err) => {
        expect(errorResponse).toEqual(errorResponse);
        done()
      }
    })
  })

  it('update recipe', (done: DoneFn) => {
    httpSpy.patch.and.returnValue(asyncData({} as DtoRecipe));

    serviceHttp.updateRecipe({} as FormData).subscribe({
      next: (recipe: DtoRecipe & DtoErrorResponse) => {
        expect(recipe).toEqual({} as DtoRecipe & DtoErrorResponse);
        done();
      }
    })
  })

  it('update recipe error', (done: DoneFn) => {
    httpSpy.patch.and.returnValue(asyncError(errorResponse));

    serviceHttp.updateRecipe({} as FormData).subscribe({
      next: () => done.fail('expected an error, update recipe'),
      error: (err) => {
        expect(errorResponse).toEqual(errorResponse);
        done();
      }
    })
  })

  it('delete recipe', (done: DoneFn) => {
    httpSpy.delete.and.returnValue(asyncData({} as { delete: boolean } & DtoErrorResponse));

    serviceHttp.deleteRecipe('id').subscribe({
      next: (res: { delete: boolean } & DtoErrorResponse) => {
        expect(res).toEqual({} as { delete: boolean } & DtoErrorResponse);
        done();
      },
      error: () => done.fail,
    })
  })

  it('delete recipe, error',(done: DoneFn) => {
    httpSpy.delete.and.returnValue(asyncError(errorResponse));

    serviceHttp.deleteRecipe('id').subscribe({
      next: () => done.fail('expected an error, delete recipe'),
      error: (err) => {
        expect(errorResponse).toEqual(errorResponse);
        done();
      }
    })
  })

  it('get allIngredient',(done: DoneFn) => {
    httpSpy.get.and.returnValue(asyncData([] as DtoIngredient[] ));

    serviceHttp.getAllIngredient({  take: 5, skip: 5 }).subscribe({
      next: (res: DtoIngredient[] & DtoErrorResponse) => {
        expect(res).toEqual([] as DtoIngredient[] )
        done()
      },
      error: () => done.fail,
    })
  })

  it('get allIngredient, error', (done: DoneFn) => {
    httpSpy.get.and.returnValue(asyncError(errorResponse));

    serviceHttp.getAllIngredient({  take: 5, skip: 5 }).subscribe({
      next: () => done.fail('expected an error, get allIngredient'),
      error: (err) => {
        expect(errorResponse).toEqual(errorResponse);
        done();
      }
    })
  })

  it('create ingredient', (done: DoneFn) => {
    httpSpy.post.and.returnValue(asyncData({} as DtoIngredient));

    serviceHttp.createIngredient({} as FormData).subscribe({
      next: (res: DtoIngredient & DtoErrorResponse) => {
        expect(res).toEqual({} as DtoIngredient & DtoErrorResponse);
        done()
      },
      error: () => done.fail
    })
  })

  it('create ingredient', (done: DoneFn) => {
    httpSpy.post.and.returnValue(asyncError(errorResponse));

    serviceHttp.createIngredient({} as FormData).subscribe({
      next: () => done.fail('expected an error, create ingredient'),
      error: (err) => {
        expect(errorResponse).toEqual(errorResponse);
        done();
      }
    })
  })

  it('update ingredient',(done: DoneFn) => {
    httpSpy.patch.and.returnValue(asyncData({} as DtoIngredient));

    serviceHttp.updateIngredient({} as FormData).subscribe({
      next: (res: DtoIngredient & DtoErrorResponse) => {
        expect(res).toEqual({} as DtoIngredient & DtoErrorResponse)
        done()
      },
      error: () => done.fail,
    })
  })

  it('update ingredient, error', (done: DoneFn) => {
    httpSpy.patch.and.returnValue(asyncError(errorResponse));

    serviceHttp.updateIngredient({} as FormData).subscribe({
      next: () => done.fail('expected an error, update ingredient'),
      error: (err) => {
        expect(errorResponse).toEqual(errorResponse);
        done();
      }
    })
  })

  it('delete ingredient', (done: DoneFn) => {
    httpSpy.delete.and.returnValue(asyncData( {} as { delete: boolean } & DtoErrorResponse));

    serviceHttp.deleteIngredient('id').subscribe({
      next: (res: { delete: boolean } & DtoErrorResponse) => {
        expect(res).toEqual({} as { delete: boolean } & DtoErrorResponse);
        done();
      },
      error: () => done.fail
    })
  })

  it('delete ingredient, error', (done: DoneFn) => {
    httpSpy.delete.and.returnValue(asyncError(errorResponse));

    serviceHttp.deleteIngredient('id').subscribe({
      next: () => done.fail('expected an error, delete ingredient'),
      error: (err) => {
        expect(errorResponse).toEqual(errorResponse)
        done()
      }
    })
  })

});
