import {ComponentFixture, fakeAsync, TestBed} from "@angular/core/testing";
import {RecipeItemComponent} from "./recipe-item.component";
import {RouterTestingModule} from "@angular/router/testing";
import {DtoIngredient, DtoRecipe} from "../../dto/dto.recipe";
import {Subject} from "rxjs";
import {By} from "@angular/platform-browser";
import {NO_ERRORS_SCHEMA} from "@angular/core";
import {RecipeLinkDirective} from "../../directive/recipe-link.directive";

describe('RecipeItemComponent', () => {
  let component: RecipeItemComponent;
  let fixture: ComponentFixture<RecipeItemComponent>;

  let recipe = {
    id: 'recipeID',
    name: 'recipeName',
    description: 'recipeDesc',
    image: '',
    ingredients: [] as DtoIngredient[],
  } as DtoRecipe;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
      ],
      providers: [
        RecipeItemComponent,
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents()

    fixture = TestBed.createComponent(RecipeItemComponent);

    component = fixture.componentInstance;
    component.recipe = recipe;
    component.index = 0;
    component.editFlagSubject = new Subject<boolean>();

  })

  it('should create', () => {
    expect(component).toBeDefined();
  });

  it('ngOnInit()', () => {
    fixture.detectChanges();
    component.editFlagSubject.next(true);
    component.ngOnInit();

    expect(component.edit).toEqual(true);
  })

  it('should select the recipe to be need edited by click', () => {
    spyOn(component, 'selectEdit');
    let htmlElem = fixture.debugElement.nativeElement.querySelector('a.list-group-item');

    component.addEdit.pipe().subscribe((emmit) => {
      expect(emmit).toEqual({id: recipe.id, index: 0});
    })

    htmlElem.click();
    expect(component.selectEdit).toHaveBeenCalled();
  })

  it('should be compared content in html element', () => {
    let name = fixture.debugElement.query(By.css('.h5')).nativeNode;
    let desc = fixture.debugElement.query(By.css('.description')).nativeNode;
    fixture.detectChanges();

    expect(name.textContent).toEqual(recipe.name);
    expect(desc.textContent).toEqual(recipe.description);
  })

  describe('test', () => {
    let linkDes: any
    let routerLink: any

    beforeEach(() => {
      fixture.detectChanges();

      linkDes = fixture.debugElement.queryAll(By.directive(RecipeLinkDirective));
      routerLink = linkDes.map((de: any) => de.injector.get(RecipeLinkDirective));
    })

    it('can click recipe link in template',() => {
      let heroesLinkDe = linkDes[0];
      let heroesLink = routerLink[0];

      let htmlElem = fixture.debugElement.nativeElement.querySelector('a.list-group-item')
      htmlElem.click();
      fixture.detectChanges();

      expect(heroesLink.navigatedTo).toEqual(['/recipe', recipe.id]);
    });
  })


})
