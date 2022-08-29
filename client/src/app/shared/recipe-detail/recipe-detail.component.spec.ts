import {ComponentFixture, TestBed} from "@angular/core/testing";
import {RecipeDetailComponent} from "./recipe-detail.component";
import {HttpClientModule} from "@angular/common/http";
import {RouterTestingModule} from "@angular/router/testing";
import {RecipeService} from "../../service/recipe.service";
import {DtoIngredient, DtoRecipe} from "../../dto/dto.recipe";
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";
import { of, ReplaySubject} from "rxjs";

describe('RecipeDetailComponent', () => {
  let component: RecipeDetailComponent;
  let fixture: ComponentFixture<RecipeDetailComponent>;

  let recipeService: jasmine.SpyObj<RecipeService>;

  let recipeServiceSpy = jasmine.createSpyObj('RecipeService', ['recipe'], {recipe: new ReplaySubject<DtoRecipe>()})

  beforeEach((() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        RouterTestingModule,
      ],
      providers: [
        RecipeDetailComponent,
        { provide: RecipeService, useValue: recipeServiceSpy }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    });

    recipeService = TestBed.inject(RecipeService) as jasmine.SpyObj<RecipeService>;

    fixture = TestBed.createComponent(RecipeDetailComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  }));

  it('should create RecipeDetailComponent', () => {
    expect(component).toBeDefined();
  })

  describe('call ngOnInit, ngOnInit()', () => {
    let recipe = {
      id: 'recipeID',
      name: 'recipeName',
      description: 'recipeDesc',
      image: 'recipeImage',
      ingredients: [] as DtoIngredient[],
    } as DtoRecipe;

    beforeEach((() => {
      component.ngOnInit();
    }))

    it('should do router subscribe', function () {
      recipeServiceSpy.recipe.next(recipe);

      expect(component.recipeSelect).toEqual(recipe);
    });

    it('should routing by id', () => {

    })
  })
})
