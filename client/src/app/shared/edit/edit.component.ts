import {Component, OnDestroy, OnInit} from '@angular/core';
import { RecipeService } from "../../service/recipe.service";
import { Subscription } from "rxjs";
import { DtoIngredient, DtoRecipe } from "../../dto/dto.recipe";
import {ActivatedRoute, Params, Router} from "@angular/router";
import { FormArray, FormBuilder, FormControl, FormGroup } from "@angular/forms";

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit, OnDestroy {
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
    // this.editRecipe = this.recipeService.editRecipe$;

    // this.editSubject = this.recipeService.editRecipe.subscribe((recipe: DtoRecipe) => {
    //   this.editMode = false;
    //   this.editRecipe = recipe;
    //   console.log(recipe)
    // });

    this.route.params.subscribe((params: Params) => {
      if(!!params){
        this.currentID = params['id']
        const recipe = this.recipeService.receiveRecipes(params['id'])
        this.recipeForm = this.fb.group({
          id: recipe?.id,
          name: recipe?.name,
          image: recipe?.image,
          description: recipe?.description,
          ingredients: this.fb.array(recipe?.ingredients ? recipe.ingredients.map((ingredient: DtoIngredient) => {
            return this.fb.group(ingredient);
          }) : [])
        });
      } else {
        this.recipeForm = this.fb.group({
          id: '',
          name: '',
          image: 'https://www.myfoodtrip.com/wp-content/uploads/2020/05/Food-Blog-Directory.jpg',
          description: '',
          ingredients: this.fb.array([this.fb.group({ name: '', amount: 0})] )
        });
      }
    })
  }

  ngOnDestroy() {
    // this.editSubject.unsubscribe()
  }

  onSubmit() {
    if(this.recipeForm.value.id.trim()){
      this.recipeService.updateRecipes( this.recipeForm.value )
    } else {
      const id = Date.now().toString();
      this.recipeService.newRecipes({ id, ...this.recipeForm.value })
    }
    this.recipeForm.reset();
  }

  cancelRecipes(e: Event) {
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
}
