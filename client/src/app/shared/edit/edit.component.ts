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
      name: [''],
      imageUrl:[''],
      ingredients: this.fb.array( [{name: '121', amount: 0} as DtoIngredient])
    });
  }

  ngOnDestroy() {
    this.editSubject.unsubscribe()
  }

  onSubmit() {

  }

  appendRecipe() {
    this.ingredients.push(this.fb.control({name: '121', amount: 0}));
  }

  receiveIngredient(i: number, key: string) {
    return this.recipeForm.get('ingredients')
  }


  get ingredients() {
    return this.recipeForm.get('ingredients') as FormArray;
  }


}
