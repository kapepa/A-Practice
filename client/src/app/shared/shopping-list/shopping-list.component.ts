import { Component, OnInit } from '@angular/core';
import {DtoIngredient, DtoRecipe} from "../../dto/dto.recipe";
import { RecipeService } from "../../service/recipe.service";

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss']
})
export class ShoppingListComponent implements OnInit {
  ingredients: DtoIngredient[] = [] as DtoIngredient[];

  constructor(
    private recipeService: RecipeService,
  ) { }

  ngOnInit(): void {
    this.recipeService.recipe.subscribe((recipe: DtoRecipe) => {
      const ingredients = recipe.ingredients
      if( !!ingredients ) this.ingredients = ingredients;
    })
  }

  addIngredient(ingredient: DtoIngredient) {
    this.ingredients.push(ingredient)
  };
}
