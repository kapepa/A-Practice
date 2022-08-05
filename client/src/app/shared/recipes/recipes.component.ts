import {Component, EventEmitter, OnDestroy, OnInit} from '@angular/core';
import {DtoRecipe} from "../../dto/dto.recipe";
import {RecipeService} from "../../service/recipe.service";
import {Subscription} from "rxjs";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss'],
})
export class RecipesComponent implements OnInit, OnDestroy {
  select: DtoRecipe = {} as DtoRecipe;
  ngRecipe!: Subscription;

  constructor(
    private recipeService: RecipeService,
  ) { };

  ngOnInit(): void {
    this.recipeService.recipe.subscribe((recipe: DtoRecipe) => {
      this.select = recipe;
    })
  }

  ngOnDestroy() {
    if(!!this.ngRecipe) this.ngRecipe.unsubscribe();
  };

  selectRecipe(recipe: DtoRecipe) {
    // this.select.emit(recipe)
    // console.log(this.select)
  }

}
