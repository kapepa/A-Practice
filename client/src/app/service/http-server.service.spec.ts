import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { HttpService } from "./http.service";
import { RouterTestingModule } from "@angular/router/testing";
import { environment } from "../../environments/environment";
import { ErrorService } from "./error.service";
import { CookieService } from "ngx-cookie-service";
import { DtoIngredient, DtoRecipe } from "../dto/dto.recipe";
import { DtoUser } from "../dto/dto.user";
import { Router } from "@angular/router";
import { HomeComponent } from "../page/home/home.component";
import {HttpErrorResponse} from "@angular/common/http";

describe('Http Server', () => {
  let url = environment.configUrl
  let router: Router;
  let httpService: HttpService;
  let httpMock: HttpTestingController;
  let errorService: jasmine.SpyObj<ErrorService>;
  let cookieService: jasmine.SpyObj<CookieService>;

  let spyHttpClient = jasmine.createSpyObj('HttpClient', ['get']);
  let spyErrorService = jasmine.createSpyObj('ErrorService', ['setError']);
  let spyCookieService = jasmine.createSpyObj('ErrorService', ['get','set']);
  let spyMockRouter = { navigate: jasmine.createSpy('navigate') };

  let user: DtoUser = {
    id: 'someID',
    name: 'MyName',
    email: 'test@mail.com',
    password: 'my_password',
    avatar: 'avatar.jpg',
    recipe: [] as DtoRecipe[],
    isActive: true,
    created_at: new Date(),
  }

  let recipe: DtoRecipe  = {
    id: 'recipeID',
    name: 'recipeName',
    description: 'recipeDescription',
    image: 'recipeImage',
    ingredients: [] as DtoIngredient[],
  }

  let ingredient: DtoIngredient = {
    id: 'ingredientID',
    name: 'ingredientName',
    amount: 2,
    public: true,
    recipe: {} as  DtoRecipe,
    created_at: new Date(),
  }

  let responseError = {
    status: 404,
    response: {
      statusCode: 404,
      message: 'message error',
    }
  };

  let errorResponse = new HttpErrorResponse({
    error: 'test 404 error',
    status: 404, statusText: 'Not Found'
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([
          { path: 'recipe', component: HomeComponent }
        ]),
      ],
      providers: [
        HttpService,
        { provide: ErrorService, useValue: spyErrorService },
        { provide: CookieService, useValue: spyCookieService },
        { provide: Router, useValue: spyMockRouter },
      ],
    });

    router = TestBed.inject(Router);
    httpService = TestBed.inject(HttpService);
    httpMock = TestBed.inject(HttpTestingController);
    errorService = TestBed.inject(ErrorService) as jasmine.SpyObj<ErrorService>;
    cookieService = TestBed.inject(CookieService) as jasmine.SpyObj<CookieService>;
  });

  it('should create authService', () => {
    expect(httpService).toBeTruthy();
  })

  // it('should catch error with custom header', () => {
  //   const apiUrl = 'https://jsonplaceholder.typicode.com/posts';
  //   authService.getPosts().subscribe((data) => {
  //     console.log(data)
  //   });
  //
  //   httpMock.expectOne({ url: apiUrl, method: 'GET' }).flush([{test: true}]);
  // });

  it('should crate query, and return query string, createQuery()', () => {
    // let query = spyOn(httpService, 'createQuery').and.returnValue('?take=5&skip=0');
    expect('?take=5&skip=0').toEqual(httpService.createQuery({ take: 5,skip: 0 }))
  })

  describe('create user, createUser()', () => {
    let http = `${url}/api/user/create`;

    it('success user did created', (done: DoneFn) => {
      let body = {create: true};
      httpService.createUser({} as FormData).subscribe({
        next: (data) => {
          expect(body).toEqual(data);
          done();
        },
        error: err => done.fail
      })

      httpMock.expectOne({url: http, method: 'POST'}).flush(body)
    })

    it('such email is already exist in db', (done: DoneFn) => {

      httpService.createUser({} as FormData).subscribe({
        next: (data) => {
          spyOn(httpService, 'clientError').and.callThrough();
          httpService.clientError(data.response);

          expect(responseError).toEqual(data);
          expect(httpService.clientError).toHaveBeenCalledTimes(1);
          done();
        },
        error: err => done.fail,
      })

      httpMock.expectOne({url: http, method: 'POST'}).flush(responseError)
    })


    it('error when create user', (done: DoneFn) => {
      let body = {create: false};
      httpService.createUser({} as FormData).subscribe({
        next: (data) => {
          expect(body).toEqual(data);
          done();
        },
        error: err => done.fail,
      })

      httpMock.expectOne({url: http, method: 'POST'}).flush(body);
    });

    it('error when create user, on server', (done: DoneFn) => {
      let body = {create: false};
      httpService.createUser({} as FormData).subscribe({
        next: () => done.fail,
        error: err => {
          expect(err).toBeTruthy();
          done();
        },
      })

      httpMock.expectOne({url: http, method: 'POST'}).flush({}, errorResponse);
    });
  })

  describe('login user, loginUser()', () => {
    let http = `${url}/api/auth/login`;
    let login = {email: 'test@mail.com', password: 'something_password'}

    it('should success login, return token', (done: DoneFn) => {
      httpService.loginUser(login).subscribe({
        next: (data) => {
          spyOn(httpService, 'setToken').and.callThrough();
          httpService.setToken(data.access_token);

          expect(httpService.setToken).toHaveBeenCalled();
          expect(cookieService.set).toHaveBeenCalled();
          expect({access_token: 'some_token'}).toEqual(data);
          done()
        },
        error: err => done.fail,
      })
      httpMock.expectOne({url: http, method: 'POST'}).flush({access_token: 'some_token'});
    })

    it('should error login',(done: DoneFn) => {
      httpService.loginUser(login).subscribe({
        next: (res) => {
          spyOn(httpService,'clientError').and.callThrough();
          httpService.clientError(res.response);

          expect(httpService.clientError).toHaveBeenCalledTimes(1)
          expect(responseError).toEqual(res);
          done();
        },
        error: err => done.fail,
      })
      httpMock.expectOne({ url: http, method: 'POST' }).flush(responseError)
    })

    it('should error login, on server',(done: DoneFn) => {
      httpService.loginUser(login).subscribe({
        next: () => done.fail,
        error: err => {
          expect(err).toBeTruthy();
          done()
        },
      })
      httpMock.expectOne({ url: http, method: 'POST' }).flush({}, errorResponse)
    })
  })

  describe('get own profile, getOwnProfile()', () => {
    let http = `${url}/api/user`;
    it('should return data profile', (done: DoneFn) => {
      httpService.getOwnProfile().subscribe({
        next: (res: DtoUser) => {
          expect(res).toEqual(user);
          done();
        },
        error: () => done.fail,
      })
      httpMock.expectOne({url: http, method: "GET"}).flush(user)
    })

    it('should return error data profile, on server', (done: DoneFn) => {
      httpService.getOwnProfile().subscribe({
        next: () => done.fail,
        error: (err) => {
          expect(err).toBeTruthy();
          done();
        },
      })
      httpMock.expectOne({url: http, method: "GET"}).flush({}, errorResponse)
    })
  })

  describe('get one recipe, getOneRecipe()', () => {
    let id = 'recipeID';
    let http = `${url}/api/recipe/one/${id}`;

    it('should get one recipe on id', (done: DoneFn) => {

      httpService.getOneRecipe(id).subscribe({
        next: (res) => {
          expect(recipe).toEqual(res)
          done()
        },
        error: () => done.fail,
      });

      httpMock.expectOne({url: http, method: 'GET'}).flush(recipe);
    });

    it('should return error', (done: DoneFn) => {
      spyOn(httpService, 'clientError').and.callThrough();
      httpService.getOneRecipe(id).subscribe({
        next: (res) => {
          httpService.clientError(res.response)

          expect(httpService.clientError).toHaveBeenCalled();
          expect(responseError).toEqual(res);
          done();
        },
        error: () => done.fail,
      });

      httpMock.expectOne({url: http, method: 'GET'}).flush(responseError);
    });

    it('should return error, one server', (done: DoneFn) => {
      httpService.getOneRecipe(id).subscribe({
        next: () => done.fail,
        error: (err) => {
          expect(err).toBeTruthy();
          done();
        },
      });

      httpMock.expectOne({url: http, method: 'GET'}).flush({}, errorResponse);
    });
  })

  describe('get recipe for edit, on id, getEditRecipe()', () => {
    let id = 'recipeID';
    let http = `${url}/api/recipe/edit/${id}`;

    it('should success get recipe', (done: DoneFn) => {
      httpService.getEditRecipe(id).subscribe({
        next: (res) => {
          expect(recipe).toEqual(res);
          done()
        },
        error: () => done.fail,
      })

      httpMock.expectOne({url: http, method: 'GET'}).flush(recipe);
    })

    it('should success get recipe',(done: DoneFn) => {
      httpService.getEditRecipe(id).subscribe({
        next: (res) => {
          expect(router.navigate).toHaveBeenCalledWith(['/recipe']);
          expect(responseError).toEqual(res);
          done()
        },
        error: () => done.fail,
      })

      httpMock.expectOne({url: http, method: 'GET'}).flush(responseError);
    })

    it('should success get recipe, on server',(done: DoneFn) => {
      httpService.getEditRecipe(id).subscribe({
        next: () => done.fail,
        error: (err) => {
          expect(err).toBeTruthy();
          done();
        }
      })

      httpMock.expectOne({url: http, method: 'GET'}).flush({}, errorResponse);
    })

  })

  describe('get all recipe, getAllRecipe()',() => {
    let http = `${url}/api/recipe?take=5&skip=0`;

    it('', () => {
      httpService.getAllRecipe({ take: 5, skip: 0 }).subscribe((res) => {
        expect([recipe]).toEqual(res);
      });
      httpMock.expectOne({ url: http, method: 'GET' }).flush([recipe]);
    })
  })

  describe('create new recipe, createRecipe()', () => {
    let http = `${url}/api/recipe/create`;

    it('should success create recipe', (done: DoneFn) => {
      httpService.createRecipe({} as FormData).subscribe({
        next: (res) => {
          expect(recipe).toEqual(res);
          done();
        },
        error: () => done.fail,
      })

      httpMock.expectOne({url: http, method: "POST"}).flush(recipe);
    })

    it('should be error when create recipe', (done: DoneFn) => {
      httpService.createRecipe({} as FormData).subscribe({
        next: (res) => {
          spyOn(httpService, 'clientError');
          httpService.clientError(res.response);

          expect(httpService.clientError).toHaveBeenCalled();
          expect(responseError).toEqual(res);
          done();
        },
        error: () => done.fail,
      })

      httpMock.expectOne({url: http, method: "POST"}).flush(responseError);
    })

    it('should be error when create recipe, on server', (done: DoneFn) => {
      httpService.createRecipe({} as FormData).subscribe({
        next: () => done.fail,
        error: (err) => {
          expect(err).toBeTruthy();
          done()
        },
      })

      httpMock.expectOne({url: http, method: "POST"}).flush({},errorResponse);
    })

  })

  describe('update recipe, updateRecipe()', () => {
    let http = `${url}/api/recipe/update`;

    it('should success update recipe', (done: DoneFn) => {
      httpService.updateRecipe({} as FormData).subscribe({
        next: (res) => {
          expect(recipe).toEqual(res);
          done();
        },
        error: () => done.fail,
      })

      httpMock.expectOne({url: http, method: 'PATCH'}).flush(recipe);
    })

    it('should be error when update', (done: DoneFn) => {
      httpService.updateRecipe({} as FormData).subscribe({
        next: (res) => {
          spyOn(httpService, 'clientError');
          httpService.clientError(res.response);

          expect(httpService.clientError).toHaveBeenCalled();
          expect(responseError).toEqual(res);
          done();
        },
        error: () => done.fail,
      })

      httpMock.expectOne({url: http, method: 'PATCH'}).flush(responseError);
    });

    it('should be error when update, on server', (done: DoneFn) => {
      httpService.updateRecipe({} as FormData).subscribe({
        next: () => done.fail,
        error: (err) => {
          expect(err).toBeTruthy();
          done();
        }
      })

      httpMock.expectOne({url: http, method: 'PATCH'}).flush({}, errorResponse);
    });
  })

  describe('delete recipe, deleteRecipe()', () => {
    let id = 'recipeID';
    let http = `${url}/api/recipe/${id}`;

    it('should success delete recipe', (done: DoneFn) => {
      httpService.deleteRecipe(id).subscribe({
        next: (res) => {
          expect({ delete: true }).toEqual(res);
          done();
        },
        error: (err) => done.fail,
      });

      httpMock.expectOne({ url: http, method: 'DELETE' }).flush({ delete: true });
    })

    it('should error delete recipe', (done: DoneFn) => {
      httpService.deleteRecipe(id).subscribe({
        next: (res) => {
          spyOn(httpService, 'clientError').and.callThrough();
          httpService.clientError(res.response);

          expect(httpService.clientError).toHaveBeenCalled();
          expect(responseError).toEqual(res);
          done();
        },
        error: () => done.fail,
      });

      httpMock.expectOne({ url: http, method: 'DELETE' }).flush(responseError);
    })

    it('should error delete recipe, on server', (done: DoneFn) => {
      httpService.deleteRecipe(id).subscribe({
        next: (res) => done.fail,
        error: (err) => {
          expect(err).toBeTruthy();
          done();
        }
      });

      httpMock.expectOne({ url: http, method: 'DELETE' }).flush({},errorResponse);
    })
  })

  describe('get all ingredient, getAllIngredient()', () => {
    let http = `${url}/api/recipe/ingredients?take=5&skip=0`;

    it('should success all ingredient', (done: DoneFn) => {
      httpService.getAllIngredient({take: 5, skip: 0}).subscribe({
        next: (res) => {
          expect([ingredient]).toEqual(res);
          done()
        },
        error: () => done.fail
      })

      httpMock.expectOne({url: http, method: 'GET' }).flush([ingredient])
    })

    it('should error when get ingredient', (done: DoneFn) => {
      httpService.getAllIngredient({take: 5, skip: 0}).subscribe({
        next: (res) => {
          done.fail('such ingredients is not find')
        },
        error: (err) => {
          expect(err).toBeTruthy();
          done()
        },
      })

      httpMock.expectOne({url: http, method: 'GET' }).flush({},errorResponse);
    })

  })

  describe('create ingredient, createIngredient()', () => {
    let http = `${url}/api/recipe/ingredient/create`;

    it('should return new ingredient', (done) => {
      httpService.createIngredient({} as FormData).subscribe({
        next: (res) => {
          expect(ingredient).toEqual(res);
          done();
        },
        error: err => done.fail,
      })

      httpMock.expectOne(http).flush(ingredient);
    })

    it('should error, on server', (done: DoneFn) => {
      httpService.createIngredient({} as FormData).subscribe({
        next: () => done.fail,
        error: (err) => {
          expect(err).toBeTruthy();
          done();
        }
      })

      httpMock.expectOne(http).flush({}, errorResponse);
    })
  })

  describe('update ingredient updateIngredient()', () => {
    let http = `${url}/api/recipe/ingredient/update`;

    it('should success update ingredient', (done: DoneFn) => {
      httpService.updateIngredient({} as FormData).subscribe({
        next: (res) => {
          expect(ingredient).toEqual(res);
          done();
        },
        error: err => done.fail,
      })

      httpMock.expectOne({url: http, method: 'PATCH'}).flush(ingredient);
    });

    it('should error when ingredient', (done: DoneFn) => {
      httpService.updateIngredient({} as FormData).subscribe({
        next: () => done.fail,
        error: err => {
          expect(err).toBeTruthy();
          done();
        },
      })

      httpMock.expectOne({url: http, method: 'PATCH'}).flush({},errorResponse);
    });
  })

  describe('delete ingredient on id, deleteIngredient()', () => {
    let id = 'ingredientID';
    let http = `${url}/api/recipe/ingredient/${id}`;

    it('should success delete ingredient', (done: DoneFn) => {
      httpService.deleteIngredient(id).subscribe({
        next: (res) => {
          expect({ delete: true }).toEqual(res);
          done();
        },
        error: err => done.fail,
      })

      httpMock.expectOne({url: http, method: 'DELETE'}).flush({ delete: true });
    })

    it('should success delete ingredient', (done: DoneFn) => {
      httpService.deleteIngredient(id).subscribe({
        next: () => done.fail,
        error: err => {
          expect(err).toBeTruthy();
          done();
        }
      })

      httpMock.expectOne({url: http, method: 'DELETE'}).flush({}, errorResponse);
    })
  })

});
