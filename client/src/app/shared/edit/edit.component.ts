import {Component, OnDestroy, OnInit} from '@angular/core';
import { RecipeService } from "../../service/recipe.service";
import { Subscription } from "rxjs";
import { DtoIngredient, DtoRecipe } from "../../dto/dto.recipe";
import { ActivatedRoute } from "@angular/router";
import { FormArray, FormBuilder, FormControl, FormGroup } from "@angular/forms";

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit, OnDestroy {

  editMode: boolean = false;
  editRecipe: DtoRecipe = {} as DtoRecipe;
  editSubject!: Subscription;
  recipeForm!: FormGroup;

  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.editRecipe = this.recipeService.editRecipe$;
    this.editSubject = this.recipeService.editRecipe.subscribe((recipe: DtoRecipe) => {
      this.editMode = false;
      this.editRecipe = recipe;
    });

    this.recipeForm = this.fb.group({
      name: '',
      image: 'https://www.myfoodtrip.com/wp-content/uploads/2020/05/Food-Blog-Directory.jpg',
      description: '',
      ingredients: this.fb.array([this.fb.group({ name: '', amount: 0})] )
    });
  }

  ngOnDestroy() {
    this.editSubject.unsubscribe()
  }

  onSubmit() {
    const id = Date.now().toString();
    this.recipeService.newRecipes({ id, ...this.recipeForm.value })
  }

  appendRecipe() {
    this.ingredientsArr.push(this.fb.group({name: '', amount: 0}));
  }

  deleteRecipe(i: number) {
    this.ingredientsArr.removeAt(i)
  }

  receiveIngredient(i: number, key: string) {
    return this.recipeForm.get('ingredients')
  }

  get ingredientsArr() {
    return this.recipeForm.get('ingredients') as FormArray;
  }
}
