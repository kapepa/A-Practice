import { Component, OnInit } from '@angular/core';
import { DtoIngredient } from "../../dto/dto.recipe";
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
    this.ingredients = this.recipeService.recipe.ingredients ? this.recipeService.recipe.ingredients : [];
  }

  addIngredient(ingredient: DtoIngredient) {
    this.ingredients.push(ingredient)
  };
}
