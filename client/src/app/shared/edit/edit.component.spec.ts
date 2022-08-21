import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditComponent } from './edit.component';
import { RouterTestingModule } from "@angular/router/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ReactiveFormsModule } from "@angular/forms";
import { RecipeService } from "../../service/recipe.service";
import { DtoIngredient, DtoRecipe } from "../../dto/dto.recipe";
import { of } from "rxjs";
import { DtoUser } from "../../dto/dto.user";
import { ActivatedRoute, Router, Routes } from "@angular/router";
import { Location } from '@angular/common';
import { RecipeDetailComponent } from "../recipe-detail/recipe-detail.component";
import {BrowserModule} from "@angular/platform-browser";
import {EditModule} from "./edit.module";

describe('EditComponent', () => {
  let fixture: ComponentFixture<EditComponent>
  let editComponent: EditComponent;
  let recipeService: RecipeService;
  let activatedRoute: ActivatedRoute;
  let router: Router;
  let location: Location

  let recipe = {
    created_at: "2022-07-21T21:27:48.350Z",
    description: "some description",
    id: "c4ca4d1b-5a86-46aa-b4e7-0b47657f82f7",
    image: "08642b49-3274-4a1d-9a44-59da96fd2829.jpg",
    ingredients: [] as DtoIngredient[],
    name: "My Name",
    user: {} as DtoUser,
  }

  const routes: Routes = [
    {path: 'recipe/:id', component: RecipeDetailComponent},
  ];

  beforeEach((() => {
    class MockRecipeService {
      editRecipe = of(recipe as DtoRecipe);
      setEdit(recipe: DtoRecipe): void {};
      updateRecipes({}: FormData): void {};
      newRecipes({}: FormData):void  {};
    }
    TestBed.configureTestingModule({
      imports: [
        BrowserModule,
        RouterTestingModule.withRoutes(routes),
        HttpClientTestingModule,
        ReactiveFormsModule,
        EditModule,
      ],
      declarations: [ ],
      providers: [
        EditComponent,
        { provide: RecipeService, useClass: MockRecipeService },
        { provide: ActivatedRoute, useValue: { snapshot: { data: { title: recipe.name, recipe } } }, }
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EditComponent);
    editComponent = TestBed.inject(EditComponent);
    recipeService = TestBed.inject(RecipeService);
    activatedRoute = TestBed.inject(ActivatedRoute);
    router = TestBed.inject(Router);
    location = TestBed.inject(Location);

    router.initialNavigation()
    fixture.detectChanges();
  }));

  it('should create editComponent', () => {
    expect(editComponent).toBeTruthy();
  });

  it('should initialize edit old FormGroup, ngOnInit', () => {
    editComponent.ngOnInit();
    let recipe = activatedRoute.snapshot.data['recipe'];
    let res = editComponent.createForm(recipe)
    recipeService.setEdit(recipe);

    expect(res.get('id')?.value).toEqual(recipe.id)
    recipeService.editRecipe.subscribe((res) => {
      expect(res).toEqual(recipe)
    })
  })

  it('should initialize new FormGroup, ngOnInit',() => {
    editComponent.ngOnInit();
    let recipe = {} as DtoRecipe;
    let res = editComponent.createForm(recipe)

    expect(res.get('id')?.value).toEqual('');
  })

  it('should create FormGroup and return ', () => {
    let form = editComponent.createForm(recipe);

    expect(form.get('name')?.value).toEqual(recipe.name);
  })

  it('should submit FormData to server old FormGroup, onSubmit', () => {
    editComponent.recipeForm = editComponent.createForm(recipe);
    editComponent.onSubmit();

    expect(editComponent.recipeForm.get('name')?.value).toBeNull();
  })

  it('should submit FormData to server New FormGroup, onSubmit', () => {
    const { id, ...other } = recipe;
    editComponent.recipeForm = editComponent.createForm({...other, id: ''});
    editComponent.onSubmit();

    expect(editComponent.recipeForm.get('name')?.value).toBeNull();
  })

  it('should reset FormGroup, resetForm', () => {
    editComponent.recipeForm = editComponent.createForm(recipe);
    editComponent.imageFile = 'image';
    editComponent.imageRecipe = 'image';

    editComponent.resetForm();

    expect(editComponent.imageFile).toBeUndefined()
    expect(editComponent.imageRecipe).toBeUndefined()
  })

  it('should cancel recipes and routing to /recipe, cancelRecipes',() => {
    editComponent.currentID = "someID"
    fixture.nativeElement.querySelector('.btn-danger').click();

    router.navigate(['/recipe',editComponent.currentID]).then((param) => {
      expect(location.path()).toEqual('/recipe/' + editComponent.currentID);
    })
    expect(true).toBeTruthy()
  })

  it('should create FormArray on field ingredients, appendRecipe', () => {
    editComponent.recipeForm = editComponent.createForm(recipe);
    editComponent.appendRecipe();

    expect([...editComponent.recipeForm.get('ingredients')?.value].length).toEqual(1)
  })

  it('should delete ingredient on index , deleteRecipe', () => {
    editComponent.recipeForm = editComponent.createForm(recipe);
    editComponent.deleteRecipe(0);

    expect([...editComponent.recipeForm.get('ingredients')?.value].length).toEqual(0)
  })

  it('click on button for load images, selectImage', () => {
    spyOn(editComponent, 'selectImage');
    let imageUrl = fixture.nativeElement.querySelector('#imageUrl')
    fixture.nativeElement.querySelector('#imageBtn').click(imageUrl);
    editComponent.selectImage(imageUrl)

    expect(editComponent.selectImage).toHaveBeenCalled();
  })

  it('should upload the file - changeInputImage = true', () => {

    let dataTransfer = new DataTransfer()
    dataTransfer.items.add(new File([''], 'test-file.pdf'))

    let inputDebugEl = fixture.nativeElement.querySelector('#imageUrl');
    inputDebugEl.files = dataTransfer.files;
    fixture.detectChanges();

    spyOn(editComponent, 'changeInputImage');

    editComponent.changeInputImage(inputDebugEl);
    expect(editComponent.changeInputImage).toHaveBeenCalled()
  });

  it('should return name of FormGroup, name', () => {
    editComponent.recipeForm = editComponent.createForm(recipe);
    let name = editComponent.name;

    expect(name?.value).toEqual(recipe.name)
  })

  it('should return description of FormGroup, description', () => {
    editComponent.recipeForm = editComponent.createForm(recipe);
    let description = editComponent.description;

    expect(description?.value).toEqual(recipe.description)
  })

});
