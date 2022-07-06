import {Component, OnDestroy, OnInit} from '@angular/core';
import { RecipeService } from "../../service/recipe.service";
import { Subscription } from "rxjs";
import {DtoRecipe} from "../../dto/dto.recipe";

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit, OnDestroy {
  editMode: boolean = false;
  editRecipe: DtoRecipe = {} as DtoRecipe;
  editSubject!: Subscription;

  constructor(
    private recipeService: RecipeService
  ) { }

  ngOnInit(): void {
    this.editRecipe = this.recipeService.editRecipe$;
    this.editSubject = this.recipeService.editRecipe.subscribe((recipe: DtoRecipe) => {
      this.editMode = false;
      this.editRecipe = recipe;
    })
  }

  ngOnDestroy() {
    this.editSubject.unsubscribe()
  }

}
