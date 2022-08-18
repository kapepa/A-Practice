import { TestBed } from '@angular/core/testing';

import { EditComponent } from './edit.component';
import { RouterTestingModule } from "@angular/router/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ReactiveFormsModule } from "@angular/forms";
import { RecipeService } from "../../service/recipe.service";
import { DtoIngredient, DtoRecipe } from "../../dto/dto.recipe";
import { of, Subject } from "rxjs";
import { DtoUser } from "../../dto/dto.user";
import {ActivatedRoute} from "@angular/router";

class MockRecipeService {
  selectIndex$: number | null = null;
  editRecipe = of({} as DtoRecipe);
  setEdit(recipe: DtoRecipe): void {}
}

describe('EditComponent', () => {
  let editComponent: EditComponent;
  let recipeService: RecipeService;
  let activatedRoute: ActivatedRoute;

  let recipe = {
    created_at: "2022-07-21T21:27:48.350Z",
    description: "some description",
    id: "c4ca4d1b-5a86-46aa-b4e7-0b47657f82f7",
    image: "08642b49-3274-4a1d-9a44-59da96fd2829.jpg",
    ingredients: [] as DtoIngredient[],
    name: "My Name",
    user: {} as DtoUser,
  }

  beforeEach((() => {

    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        ReactiveFormsModule,
      ],
      declarations: [ ],
      providers: [
        EditComponent,
        { provide: RecipeService, useClass: MockRecipeService },
        { provide: ActivatedRoute, useValue: { snapshot: { data: { title: recipe.name, recipe } } }, }
      ]
    }).compileComponents();

    editComponent = TestBed.inject(EditComponent);
    recipeService = TestBed.inject(RecipeService);
    activatedRoute = TestBed.inject(ActivatedRoute);
  }));

  it('should create editComponent', () => {
    expect(editComponent).toBeTruthy();
  });

  it('', () => {
    editComponent.ngOnInit();
    let recipe = activatedRoute.snapshot.data['recipe'];

    recipeService.setEdit(recipe)

    recipeService.editRecipe.subscribe((recipe) => {
      console.log(recipe)
    })
  })
});
