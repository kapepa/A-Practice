import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RecipeService } from "./recipe.service";
import { HttpService } from "./http.service";
import { RouterTestingModule } from "@angular/router/testing";
import { RecipeDetailComponent } from "../shared/recipe-detail/recipe-detail.component";
import { DtoIngredient, DtoRecipe } from "../dto/dto.recipe";
import { DtoErrorResponse } from "../dto/dto.common";
import { of } from "rxjs";
import { Router } from "@angular/router";

describe('RecipeService', () => {
  let serviceRecipe: RecipeService;
  let httpServiceSpy: jasmine.SpyObj<HttpService>;
  let router: Router;

  let mockHttpService = jasmine.createSpyObj('HttpService', [
    'getOneRecipe', 'updateRecipe', 'getEditRecipe', 'createRecipe', 'deleteRecipe',
  ]);


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([
          { path: 'recipe/:id', component: RecipeDetailComponent },
        ]),
      ],
      providers: [
        RecipeService,
        { provide: HttpService, useValue: mockHttpService},
      ],
      declarations: [RecipeDetailComponent]
    })
    serviceRecipe = TestBed.inject(RecipeService);
    httpServiceSpy = TestBed.inject(HttpService) as jasmine.SpyObj<HttpService>;
    router = TestBed.inject(Router);
    router.initialNavigation();
  })

  it('get one recipe on id', () => {
    httpServiceSpy.getOneRecipe.and.returnValue(of({} as DtoRecipe & DtoErrorResponse))
    serviceRecipe.receiveRecipes('id');

    expect(serviceRecipe.recipe$).toEqual({} as DtoRecipe & DtoErrorResponse)
  })

  it('update exist recipe ', () => {
    let fixture = TestBed.createComponent(RecipeDetailComponent);
    let page = fixture.debugElement.componentInstance;

    serviceRecipe.recipes = [{} as DtoRecipe];
    serviceRecipe.selectIndex$ = 0;
    httpServiceSpy.updateRecipe.and.returnValue(of({id: 'id'} as DtoRecipe & DtoErrorResponse));

    serviceRecipe.updateRecipes({} as FormData);

    expect(page).toBeTruthy();
    expect(serviceRecipe.recipes).toEqual([{id: 'id'} as DtoRecipe]);
  })

  it('get recipe edit',() => {
    httpServiceSpy.getEditRecipe.and.returnValue(of({} as DtoRecipe & DtoErrorResponse));
    serviceRecipe.getRecipeEdit('id');

    expect(serviceRecipe.editRecipe$).toEqual({} as DtoRecipe)
  })

  it('set edit', () => {
    serviceRecipe.setEdit({} as DtoRecipe)

    expect(serviceRecipe.editRecipe$).toEqual({} as DtoRecipe)
  });

  it('set index', () => {
    serviceRecipe.setIndex(0);

    expect(serviceRecipe.selectIndex$).toEqual(0);
  })

  it('new recipes', () => {
    httpServiceSpy.createRecipe.and.returnValue(of({} as DtoRecipe & DtoErrorResponse));
    serviceRecipe.newRecipes({} as FormData);

    expect(serviceRecipe.recipes).toEqual([] as DtoRecipe[]);
  })

  it('delete recipes', () => {
    httpServiceSpy.deleteRecipe.and.returnValue(of({} as { delete: boolean } & DtoErrorResponse));
    serviceRecipe.deleteRecipes();

    expect(serviceRecipe.recipes).toEqual([] as DtoRecipe[]);
  })
})
