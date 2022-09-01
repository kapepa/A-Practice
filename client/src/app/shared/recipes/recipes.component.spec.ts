import {ComponentFixture, TestBed} from "@angular/core/testing";
import {RecipesComponent} from "./recipes.component";
import {RecipeService} from "../../service/recipe.service";
import {of, Subject} from "rxjs";
import {DtoIngredient, DtoRecipe} from "../../dto/dto.recipe";
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";

describe('RecipesComponent',() => {
  let component: RecipesComponent;
  let fixture: ComponentFixture<RecipesComponent>;

  let recipe = {
    id: 'recipeID',
    name: 'recipeName',
    description: 'recipeDesc',
    image: '',
    ingredients: [] as DtoIngredient[],
  } as DtoRecipe;

  let recipeServiceMock = jasmine.createSpyObj('RecipeService',
    ['recipe'],
    {recipe: new Subject<DtoRecipe>()}
  );

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        RecipesComponent,
      ],
      providers: [
        { provide: RecipeService, useValue: recipeServiceMock }
      ],
      schemas:[CUSTOM_ELEMENTS_SCHEMA]
    })

    fixture = TestBed.createComponent(RecipesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

  })

  it('should create', () => {
    expect(component).toBeDefined();
  });

  describe('RecipesComponent ngOnInit', () => {
    beforeEach(() => {
      component.ngOnInit();
    })

    it('should return new recipe, subscribe', () => {
      recipeServiceMock.recipe.next(recipe);

      expect(component.select).toEqual(recipe);
    })
  })

  describe('RecipesComponent ngOnDestroy', () => {
    beforeEach(() => {
      component.ngOnInit();
      component.ngOnDestroy();
    })

    it('should be unsubscribe from recipe, subscribe', () => {
      expect(component.ngRecipe.closed).toBeTrue();
    })
  })
})
