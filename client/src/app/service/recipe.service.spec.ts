import { TestBed } from '@angular/core/testing';
import { RecipeService } from "./recipe.service";
import { HttpService } from "./http.service";
import { RouterTestingModule } from "@angular/router/testing";
import { RecipeDetailComponent } from "../shared/recipe-detail/recipe-detail.component";
import {asyncData} from "../../testing/async-observable-helpers";
import {DtoRecipe} from "../dto/dto.recipe";

describe('RecipeService', () => {
  let serviceRecipe: RecipeService;
  let httpServiceSpy: jasmine.SpyObj<HttpService>;

  let mockHttpService = jasmine.createSpyObj('HttpService', ['getOneRecipe']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes(
          [{path: 'recipe', component: RecipeDetailComponent }]
        )
      ],
      providers: [
        RecipeService,
        { provide: HttpService, useValue: mockHttpService}
      ]
    })
    serviceRecipe = TestBed.inject(RecipeService);
    httpServiceSpy = TestBed.inject(HttpService) as jasmine.SpyObj<HttpService>;
  })

  // it('receive recipes', (done: DoneFn) => {
  //   mockHttpService.getOneRecipe.and.returnValue(asyncData({} as DtoRecipe));
  //
  //
  // })
})
