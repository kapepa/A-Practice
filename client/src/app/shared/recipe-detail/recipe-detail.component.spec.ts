import {ComponentFixture, fakeAsync, TestBed, tick, waitForAsync} from "@angular/core/testing";
import {RecipeDetailComponent} from "./recipe-detail.component";
import {HttpClientModule} from "@angular/common/http";
import {RouterTestingModule} from "@angular/router/testing";
import {RecipeService} from "../../service/recipe.service";
import {DtoIngredient, DtoRecipe} from "../../dto/dto.recipe";
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";
import {of, ReplaySubject} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {By} from "@angular/platform-browser";
import {routes} from "../../layout/layout-def/layout-def.module";
import {Location} from "@angular/common";
import {RecipeLinkDirective} from "../../directive/recipe-link.directive";

describe('RecipeDetailComponent', () => {
  let component: RecipeDetailComponent;
  let fixture: ComponentFixture<RecipeDetailComponent>;
  let recipeService: jasmine.SpyObj<RecipeService>;
  let router: Router;
  let location: Location;

  let recipeServiceSpy = jasmine.createSpyObj('RecipeService',
    ['receiveRecipes', 'deleteRecipes'],
    {recipe: new ReplaySubject<DtoRecipe>()}
  );

  let recipe = {
    id: 'recipeID',
    name: 'recipeName',
    description: 'recipeDesc',
    image: '',
    ingredients: [] as DtoIngredient[],
  } as DtoRecipe;

  beforeEach((() => {
    // TestBed.overrideComponent(RecipeDetailComponent, { set: { providers: [] } });
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        RouterTestingModule.withRoutes(routes),
      ],
      providers: [
        RecipeLinkDirective,
        RecipeDetailComponent,
        { provide: RecipeService, useValue: recipeServiceSpy },
        { provide: ActivatedRoute, useValue: { params: of({id: "testID"}) } },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    recipeService = TestBed.inject(RecipeService) as jasmine.SpyObj<RecipeService>;
    router = TestBed.inject(Router);
    location = TestBed.inject(Location);

    fixture = TestBed.createComponent(RecipeDetailComponent);
    component = fixture.componentInstance;

    router.initialNavigation();
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

  it('should delete recipe, deleteRecipe()',fakeAsync(() => {
    component.recipeSelect = recipe;
    fixture.detectChanges();
    recipeServiceSpy.deleteRecipes.and.callThrough();

    let btn = fixture.debugElement.query(By.css('#deleteRecipe'));

    btn.triggerEventHandler('click',{preventDefault : () => {}});

    expect(recipeServiceSpy.deleteRecipes).toHaveBeenCalled();
    router.navigate(['recipe']);
    tick();
    expect(location.path()).toBe('/recipe');
  }))
})
