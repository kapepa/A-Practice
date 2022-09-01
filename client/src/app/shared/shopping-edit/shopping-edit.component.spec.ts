import {ComponentFixture, TestBed} from "@angular/core/testing";
import {ShoppingEditComponent} from "./shopping-edit.component";
import {ShoppingService} from "../../service/shopping.service";
import {of, Subject} from "rxjs";
import {DtoIngredient, DtoRecipe} from "../../dto/dto.recipe";
import {NO_ERRORS_SCHEMA} from "@angular/core";
import {ReactiveFormsModule} from "@angular/forms";
import {By} from "@angular/platform-browser";

describe('ShoppingEditComponent', () => {
  let component: ShoppingEditComponent;
  let fixture: ComponentFixture<ShoppingEditComponent>;

  let ingredient: DtoIngredient = {
    id: 'ingredientID',
    name: 'ingredientName',
    amount: 1,
    public: false,
    recipe: {} as DtoRecipe,
    created_at: new Date(),
  }

  let shoppingServiceMoc = jasmine.createSpyObj('ShoppingService',
    ['updateIngredient', 'createIngredient', 'deleteIngredient'],
    {editIngredient: new Subject<DtoIngredient>(), editIndex$: 0}
  )

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
      ],
      declarations: [
        ShoppingEditComponent,
      ],
      providers: [
        { provide: ShoppingService, useValue: shoppingServiceMoc },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents()

    fixture = TestBed.createComponent(ShoppingEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  })

  it('should create', () => {
    expect(component).toBeDefined();
  });

  describe('ShoppingEditComponent ngOnInit', () => {
    beforeEach(() => {
      component.ngOnInit();
    })

    it('should be dynamic edit ingredient, Subject', () => {
      shoppingServiceMoc.editIngredient.next(ingredient);

      expect(component.name?.value).toEqual(ingredient.name);
      expect(component.amount?.value).toEqual(ingredient.amount);
    })

    it('should be create new from ingredient', () => {
      expect(component.name?.value).toEqual('');
      expect(component.amount?.value).toEqual(0);
    })
  })

  it('should create form ingredient, formCreate()', () => {
    let { id, name, amount } = component.formCreate(ingredient).value;
    fixture.detectChanges();

    expect(id).toEqual(ingredient.id);
    expect(name).toEqual(ingredient.name);
  })

  it('should send form ingredient new or changed, onSubmit()', () => {
    shoppingServiceMoc.updateIngredient.and.callFake(() => { component.onReset() });
    component.shoppingForm = component.formCreate(ingredient);
    let form = fixture.debugElement.query(By.css('#shoppingForm'))

    form.triggerEventHandler('submit')

    expect(shoppingServiceMoc.updateIngredient).toHaveBeenCalled();
    expect(shoppingServiceMoc.createIngredient).not.toHaveBeenCalled();
    expect(component.shoppingForm.value).toEqual({id: null, name: null, amount: null});
  })

  it('should reset form, onReset()', () => {
    component.shoppingForm = component.formCreate(ingredient);

    component.onReset();
    expect(component.shoppingForm.value).toEqual({id: null, name: null, amount: null});
  })

  it('should delete ingredient, onDelete()', () => {
    shoppingServiceMoc.deleteIngredient.and.callFake(() => { component.onReset() })
    let deleteBtn = fixture.debugElement.query(By.css('#ingredientDelete'));

    deleteBtn.triggerEventHandler('click');

    expect(shoppingServiceMoc.deleteIngredient).toHaveBeenCalled();
    expect(component.shoppingForm.value).toEqual({id: null, name: null, amount: null});
  })

  describe('getter component', () => {
    beforeEach(() => {
      component.shoppingForm = component.formCreate(ingredient);
    })

    it('should return name of form', () => {
      expect(component.name?.value).toEqual(ingredient.name)
    })

    it('should return amount of form', () => {
      expect(component.amount?.value).toEqual(ingredient.amount)
    })

    it('should return index ingredient', () => {
      expect(shoppingServiceMoc.editIndex$).toEqual(0)
    })
  })
})
