import {ComponentFixture, TestBed} from "@angular/core/testing";
import {ShoppingListComponent} from "./shopping-list.component";
import {RecipeService} from "../../service/recipe.service";
import {ShoppingService} from "../../service/shopping.service";
import {of, Subject} from "rxjs";
import {DtoIngredient, DtoRecipe} from "../../dto/dto.recipe";
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";

describe('ShoppingListComponent',() => {
  let component: ShoppingListComponent;
  let fixture: ComponentFixture<ShoppingListComponent>;

  let shoppingService: jasmine.SpyObj<ShoppingService>;

  let ingredient: DtoIngredient = {
    id: 'ingredientID',
    name: 'ingredientName',
    amount: 1,
    public: false,
    recipe: {} as DtoRecipe,
    created_at: new Date(),
  }

  let shoppingServiceMoc = jasmine.createSpyObj('ShoppingService',
      ['selectEdit', 'getIngredientRequest', 'getIngredientList'],
    {ingredient: new Subject<DtoIngredient[]>()},
    )

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      declarations: [
        ShoppingListComponent,
      ],
      providers: [
        { provide: ShoppingService, useValue: shoppingServiceMoc },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents()

    shoppingService = TestBed.inject(ShoppingService) as jasmine.SpyObj<ShoppingService>;

    fixture = TestBed.createComponent(ShoppingListComponent);
    component = fixture.componentInstance;

    shoppingServiceMoc.getIngredientList = [ingredient] as DtoIngredient[]

    fixture.detectChanges();
  })

  it('should create', () => {
    expect(component).toBeDefined();
  });

  describe('ngOnInit, ShoppingListComponent', () => {
    beforeEach(() => {
      component.ngOnInit();
    })

    it('should be get current list ingredient from ShoppingService', () => {
      expect(shoppingServiceMoc.getIngredientList).toEqual([ingredient]);
    })

    it('should be dynamic change ingredient arr from ShoppingService, Subject',() => {
      let list = [ingredient, ingredient];
      shoppingServiceMoc.ingredient.next(list);

      expect(component.ingredients).toEqual(list);
    })
  })
})
