import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { RecipeService } from "../../service/recipe.service";
import {Subject, Subscription} from "rxjs";
import { DtoIngredient, DtoRecipe } from "../../dto/dto.recipe";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit, OnDestroy {
  imageFile!: undefined | File | string | null;
  imageRecipe!: undefined | ArrayBuffer | string | null;

  currentID: string | undefined;
  editMode: boolean = false;
  editRecipe: DtoRecipe = {} as DtoRecipe;
  editSubject!: Subscription;
  recipeForm!: FormGroup;

  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      if(!!params){
        this.currentID = params['id']
        const recipe = this.recipeService.receiveRecipes(params['id'])
        this.recipeForm = this.fb.group({
          id: recipe?.id,
          name: recipe?.name,
          // image: recipe?.image,
          description: recipe?.description,
          ingredients: this.fb.array(recipe?.ingredients ? recipe.ingredients.map((ingredient: DtoIngredient) => {
            return this.fb.group(ingredient);
          }) : [])
        });
        this.imageRecipe = recipe?.image;
      } else {
        this.recipeForm = this.fb.group({
          id: ['', Validators.required],
          name: ['', Validators.required],
          // image: ['', Validators.required],
          description: ['', Validators.required],
          ingredients: this.fb.array([this.fb.group({ name: '', amount: 0})] )
        });
      }
    })
  }

  ngOnDestroy() {
    // this.editSubject.unsubscribe()
  }

  onSubmit() {
    const { name, description, ingredients } = this.recipeForm.value;
    const form = new FormData();
    if( !!name ) form.append('name', name);
    if( this.imageFile ) form.append('image', this.imageFile);
    if( !!description ) form.append('description', description);
    if( !!ingredients ){
      // form.append('ingredients', JSON.stringify(ingredients));
      for (let i = 0; i < ingredients.length; i++) {
        form.append('ingredients['+ i +'][name]', ingredients[i]['name']);
        form.append('ingredients['+ i +'][amount]', ingredients[i]['amount']);
      }
    }

    if(this.recipeForm.value.id){
      this.recipeService.updateRecipes( form );
    } else {
      this.recipeService.newRecipes( form );
    }
    this.recipeForm.reset();
  }

  cancelRecipes(e: MouseEvent) {
    this.recipeForm.reset();
    this.router.navigate(['/recipe', this.currentID]);
  }

  appendRecipe() {
    this.ingredientsArr.push(this.fb.group({name: '', amount: 0}));
  }

  deleteRecipe(i: number) {
    this.ingredientsArr.removeAt(i);
  }

  receiveIngredient(i: number, key: string) {
    return this.recipeForm.get('ingredients');
  }

  get ingredientsArr() {
    return this.recipeForm.get('ingredients') as FormArray;
  }

  selectImage(elem: HTMLInputElement) { elem.click(); }

  changeInputImage(e: Event) {
    const elem = (e.target as HTMLInputElement);
    if(elem.files && elem.files[0]){
      this.imageFile = elem.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(elem.files[0]);
      reader.onload = (filesText: ProgressEvent<FileReader>) => {
        this.imageRecipe = (filesText.currentTarget as FileReader).result;
      }
    }

  }
}
