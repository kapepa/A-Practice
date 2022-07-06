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

    this.recipeForm = new FormGroup({
      name: new FormControl(''),
      imageUrl: new FormControl(''),
      ingredients: new FormArray( [new FormControl('sdasd')])
    })
  }

  ngOnDestroy() {
    this.editSubject.unsubscribe()
  }

  onSubmit() {

  }



  get ingredients() {
    return (this.recipeForm.get('ingredients') as FormArray).value as DtoRecipe[];
  }

}
