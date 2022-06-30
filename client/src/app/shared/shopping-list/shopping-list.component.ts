import { Component, OnInit } from '@angular/core';
import {DtoIngredient, DtoRecipe} from "../../dto/dto.recipe";
import { RecipeService } from "../../service/recipe.service";
import {ShoppingService} from "../../service/shopping.service";

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss']
})
export class ShoppingListComponent implements OnInit {
  ingredients: DtoIngredient[] = [] as DtoIngredient[];

  constructor(
    private recipeService: RecipeService,
    private shoppingService: ShoppingService
  ) { }

  ngOnInit(): void {
    this.ingredients = this.shoppingService.ingredientList;
    this.shoppingService.ingredient.subscribe((ingredient: DtoIngredient[]) => {
      this.ingredients = ingredient;
    })
    // this.recipeService.recipe.subscribe((recipe: DtoRecipe) => {
    //   const ingredients = recipe.ingredients
    //   if( !!ingredients ) this.ingredients = ingredients;
    // })
  }

  addIngredient(ingredient: DtoIngredient) {
    this.shoppingService.append(ingredient)
  };
}
