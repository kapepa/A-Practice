import {ComponentFixture, fakeAsync, TestBed} from "@angular/core/testing";
import {RecipeListComponent} from "./recipe-list.component";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";
import {RecipeService} from "../../service/recipe.service";
import {RouterTestingModule} from "@angular/router/testing";
import {Observable, of, ReplaySubject, Subject} from "rxjs";
import {DtoIngredient, DtoRecipe} from "../../dto/dto.recipe";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {routes} from "../../layout/layout-def/layout-def.module";

describe('RecipeListComponent', () => {
  let component: RecipeListComponent;
  let fixture: ComponentFixture<RecipeListComponent>;

  let recipeService: jasmine.SpyObj<RecipeService>;
  let recipeServiceSpy: jasmine.SpyObj<RecipeService>;

  let router: Router;
  let routerSpy: any;

  let recipes = {
    id: 'recipeID',
    name: 'recipeName',
    description: 'recipeDesc',
    image: '',
    ingredients: [] as DtoIngredient[],
  } as DtoRecipe;

  beforeEach(() => {

    recipeServiceSpy = jasmine.createSpyObj('RecipeService',
      ['getAllRecipe'],
      {
        recipesList: new ReplaySubject<DtoRecipe[]>(),
        getRecipesAll: [recipes],
      }
    );

    class MockServices {
      public events = of( new NavigationEnd(0, '/recipe/someID/edit', '/recipe/someID/edit'));
    }

    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        // RouterTestingModule.withRoutes(routes),
      ],
      declarations: [
        RecipeListComponent,
      ],
      providers: [
        { provide: ActivatedRoute, useValue: jasmine.createSpyObj('ActivatedRoute',['navigate'])},
        { provide: RecipeService, useValue: recipeServiceSpy },
        { provide: Router, useClass: MockServices },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    router = TestBed.inject(Router)
    recipeService = TestBed.inject(RecipeService) as jasmine.SpyObj<RecipeService>;

    fixture = TestBed.createComponent(RecipeListComponent);
    fixture = TestBed.createComponent(RecipeListComponent);
    component = fixture.componentInstance;
    component.editFlag = false;
    fixture.detectChanges();

    // router.initialNavigation();
  })

  it('should create RecipeListComponent', () => {
    expect(component).toBeDefined();
  });

  describe('ngOnInit()', () => {
    beforeEach(() => {
      component.ngOnInit();
    })

    it('should get DtoRecipe[]', () => {
      recipeServiceSpy.recipesList.next([recipes]);
      recipeServiceSpy.getAllRecipe.and.callThrough();
      component.recipes = recipeServiceSpy.getRecipesAll;

      expect(component.recipes).toEqual([recipes]);
      expect(recipeServiceSpy.getAllRecipe).toHaveBeenCalled();
      console.log(component.recipesSub)
    })

    it('should get DtoRecipe[] Subject', () => {
      recipeServiceSpy.recipesList.next([recipes, recipes]);

      expect(component.recipes).toEqual([recipes, recipes]);
      expect(component.recipesSub).toBeTruthy();
    })

    it('router events', fakeAsync(() => {
      expect(component.editFlag).toBeTrue()
    }))
  })

  describe('ngOnDestroy()', () => {
    beforeEach(() => {
      component.ngOnDestroy();
    })

    it('should do unsubscribe from recipeService, method recipesList Subject', () => {
      recipeServiceSpy.recipesList.next([recipes]);
      // console.log(component.recipesSub)
    })
  })

})
