import {ComponentFixture, TestBed, waitForAsync} from "@angular/core/testing";
import {RecipeDetailComponent} from "./recipe-detail.component";
import {HttpClientModule} from "@angular/common/http";
import {RouterTestingModule} from "@angular/router/testing";
import {RecipeService} from "../../service/recipe.service";
import {DtoIngredient, DtoRecipe} from "../../dto/dto.recipe";
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";
import {of, ReplaySubject} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {By} from "@angular/platform-browser";
import {HomeComponent} from "../../page/home/home.component";

describe('RecipeDetailComponent', () => {
  let component: RecipeDetailComponent;
  let fixture: ComponentFixture<RecipeDetailComponent>;
  let recipeService: jasmine.SpyObj<RecipeService>;

  let recipeServiceSpy = jasmine.createSpyObj('RecipeService',
    ['receiveRecipes', 'deleteRecipes'],
    {recipe: new ReplaySubject<DtoRecipe>()}
  );

  let recipe = {
    id: 'recipeID',
    name: 'recipeName',
    description: 'recipeDesc',
    image: 'recipeImage',
    ingredients: [] as DtoIngredient[],
  } as DtoRecipe;

  beforeEach((() => {
    // TestBed.overrideComponent(RecipeDetailComponent, { set: { providers: [] } });
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        RouterTestingModule,
      ],
      providers: [
        RecipeDetailComponent,
        { provide: RecipeService, useValue: recipeServiceSpy },
        { provide: ActivatedRoute, useValue: { params: of({id: "testID"}) } },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    recipeService = TestBed.inject(RecipeService) as jasmine.SpyObj<RecipeService>;

    fixture = TestBed.createComponent(RecipeDetailComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  }));

  it('should create RecipeDetailComponent', () => {
    expect(component).toBeDefined();
  })

  describe('call ngOnInit, ngOnInit()', () => {
    beforeEach((() => {
      component.ngOnInit();
    }))

    it('should do router subscribe', () => {
      recipeServiceSpy.recipe.next(recipe);

      expect(component.recipeSelect).toEqual(recipe);
    });

    it('should routing by id', () => {
      recipeServiceSpy.receiveRecipes.and.callFake(() => {});

      expect(recipeServiceSpy.receiveRecipes).toHaveBeenCalled();
    })
  })

  it('should delete recipe, deleteRecipe()',() => {
    component.recipeSelect = recipe;
    fixture.detectChanges();
    recipeServiceSpy.deleteRecipes.and.callThrough();

    let btn = fixture.debugElement.query(By.css('#deleteRecipe'));

    btn.triggerEventHandler('click',{preventDefault : () => {}});

    expect(recipeServiceSpy.deleteRecipes).toHaveBeenCalled();
  })
})
