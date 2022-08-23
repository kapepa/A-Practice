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

describe('Http Server', () => {
  let url = environment.configUrl
  let router: Router;
  let httpService: HttpService;
  let httpMock: HttpTestingController;
  let errorService: jasmine.SpyObj<ErrorService>;
  let cookieService: jasmine.SpyObj<CookieService>;

  let spyErrorService = jasmine.createSpyObj('ErrorService', ['setError']);
  let spyCookieService = jasmine.createSpyObj('ErrorService', ['get','set']);
  let spyMockRouter = { navigate: jasmine.createSpy('navigate') };

  let responseError = {
    status: 404,
    response: {
      statusCode: 404,
      message: 'message error',
    }
  };

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

    it('success user did created', () => {
      let body = {create: true};
      httpService.createUser({} as FormData).subscribe((data) => {

        expect(body).toEqual(data);
      })

      httpMock.expectOne({url: http, method: 'POST'}).flush(body)
    })

    it('such email is already exist in db', () => {

      httpService.createUser({} as FormData).subscribe((data) => {
        spyOn(httpService, 'clientError').and.callThrough();
        httpService.clientError(data.response);

        expect(responseError).toEqual(data);
        expect(httpService.clientError).toHaveBeenCalledTimes(1);
      })

      httpMock.expectOne({url: http, method: 'POST'}).flush(responseError)
    })


    it('error when create user', function () {
      let body = {create: false};
      httpService.createUser({} as FormData).subscribe((data) => {
        expect(body).toEqual(data);
      })

      httpMock.expectOne({url: http, method: 'POST'}).flush(body);
    });
  })

  describe('login user, loginUser()', () => {
    let http = `${url}/api/auth/login`;
    let login = {email: 'test@mail.com', password: 'something_password'}

    it('should success login, return token', () => {
      httpService.loginUser(login).subscribe((data) => {
        spyOn(httpService, 'setToken').and.callThrough();
        httpService.setToken(data.access_token);

        expect(httpService.setToken).toHaveBeenCalled();
        expect(cookieService.set).toHaveBeenCalled();
        expect({access_token: 'some_token'}).toEqual(data)
      })
      httpMock.expectOne({url: http, method: 'POST'}).flush({access_token: 'some_token'});
    })

    it('should error login',() => {
      httpService.loginUser(login).subscribe((res) => {
        spyOn(httpService,'clientError').and.callThrough();
        httpService.clientError(res.response);

        expect(httpService.clientError).toHaveBeenCalledTimes(1)
        expect(responseError).toEqual(res);
      })
      httpMock.expectOne({ url: http, method: 'POST' }).flush(responseError)
    })
  })

  describe('get own profile, getOwnProfile()', () => {
    let http = `${url}/api/user`;
    it('should return data profile', () => {
      httpService.getOwnProfile().subscribe((res: DtoUser) => {
        expect(res).toEqual(user);
      })
      httpMock.expectOne({url: http, method: "GET"}).flush(user)
    })
  })

  describe('get one recipe, getOneRecipe()', () => {
    let id = 'recipeID';
    let http = `${url}/api/recipe/one/${id}`;

    it('should get one recipe on id', () => {

      httpService.getOneRecipe(id).subscribe((res) => {
        expect(recipe).toEqual(res)
      });

      httpMock.expectOne({url: http, method: 'GET'}).flush(recipe);
    });

    it('should return error', () => {
      spyOn(httpService, 'clientError').and.callThrough();
      httpService.getOneRecipe(id).subscribe((res) => {
        httpService.clientError(res.response)

        expect(httpService.clientError).toHaveBeenCalled();
        expect(responseError).toEqual(res);
      });

      httpMock.expectOne({url: http, method: 'GET'}).flush(responseError);
    });
  })

  describe('get recipe for edit, on id, getEditRecipe()', () => {
    let id = 'recipeID';
    let http = `${url}/api/recipe/edit/${id}`;

    it('should success get recipe', () => {
      httpService.getEditRecipe(id).subscribe((res) => {
        expect(recipe).toEqual(res);
      })

      httpMock.expectOne({url: http, method: 'GET'}).flush(recipe);
    })

    it('should success get recipe',() => {
      httpService.getEditRecipe(id).subscribe((res) => {
        expect(router.navigate).toHaveBeenCalledWith(['/recipe']);
        expect(responseError).toEqual(res);
      })

      httpMock.expectOne({url: http, method: 'GET'}).flush(responseError);
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

    it('should success create recipe', () => {
      httpService.createRecipe({} as FormData).subscribe((res) => {
        expect(recipe).toEqual(res);
      })

      httpMock.expectOne({url: http, method: "POST"}).flush(recipe);
    })

    it('should be error when create recipe', () => {
      httpService.createRecipe({} as FormData).subscribe((res) => {
        spyOn(httpService, 'clientError');
        httpService.clientError(res.response);

        expect(httpService.clientError).toHaveBeenCalled();
        expect(responseError).toEqual(res);
      })

      httpMock.expectOne({url: http, method: "POST"}).flush(responseError);
    })
  })

  describe('update recipe, updateRecipe()', () => {
    let http = `${url}/api/recipe/update`;

    it('should success update recipe', () => {
      httpService.updateRecipe({} as FormData).subscribe((res) => {
        expect(recipe).toEqual(res);
      })

      httpMock.expectOne({url: http, method: 'PATCH'}).flush(recipe);
    })

    it('should be error when update', () => {
      httpService.updateRecipe({} as FormData).subscribe((res) => {
        spyOn(httpService, 'clientError');
        httpService.clientError(res.response);

        expect(httpService.clientError).toHaveBeenCalled();
        expect(responseError).toEqual(res);
      })

      httpMock.expectOne({url: http, method: 'PATCH'}).flush(responseError);
    });
  })

  describe('delete recipe, deleteRecipe()', () => {
    let id = 'recipeID';
    let http = `${url}/api/recipe/${id}`;

    it('should success delete recipe', () => {
      httpService.deleteRecipe(id).subscribe((res) => {
        expect({ delete: true }).toEqual(res);
      });

      httpMock.expectOne({ url: http, method: 'DELETE' }).flush({ delete: true });
    })

    it('should success delete recipe', () => {
      httpService.deleteRecipe(id).subscribe((res) => {
        spyOn(httpService, 'clientError');
        httpService.clientError(res.response);

        expect(httpService.clientError).toHaveBeenCalled();
        expect(responseError).toEqual(res);
      });

      httpMock.expectOne({ url: http, method: 'DELETE' }).flush(responseError);
    })
  })

});
