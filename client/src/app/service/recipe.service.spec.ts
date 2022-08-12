import { TestBed } from '@angular/core/testing';
import { RecipeService } from "./recipe.service";
import { HttpService } from "./http.service";
import { RouterTestingModule } from "@angular/router/testing";
import { RecipeDetailComponent } from "../shared/recipe-detail/recipe-detail.component";
import { DtoRecipe } from "../dto/dto.recipe";
import { DtoErrorResponse } from "../dto/dto.common";
import { of } from "rxjs";

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

  it('receive recipes', () => {
    httpServiceSpy.getOneRecipe.and.returnValue(of({} as DtoRecipe & DtoErrorResponse))
    serviceRecipe.receiveRecipes('id');

    expect(serviceRecipe.recipe$).toEqual({} as DtoRecipe & DtoErrorResponse)
  })
})
