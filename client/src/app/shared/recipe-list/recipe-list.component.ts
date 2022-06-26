import { Component, OnInit } from '@angular/core';
import { DtoRecipe } from "../../dto/dto.recipe";
import { RecipeService } from "../../service/recipe.service";

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent implements OnInit {
  recipes!: DtoRecipe[];

  constructor(
    private recipeService: RecipeService,
  ) { }

  ngOnInit(): void {
    this.recipes = this.recipeService.recipes
  }

  recipeSelected (recipe: DtoRecipe) {
    console.log(recipe)
  }
}
