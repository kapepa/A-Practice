import {Component, Input, OnInit} from '@angular/core';
import { RecipeService } from "../../service/recipe.service";
import {DtoIngredient, DtoRecipe} from "../../dto/dto.recipe";
import {ShoppingService} from "../../service/shopping.service";

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss']
})
export class RecipeDetailComponent implements OnInit {
  recipe: DtoRecipe = {} as DtoRecipe;
  @Input() recipeSelect!: DtoRecipe;

  constructor(
    private recipeService: RecipeService,
    private shoppingService: ShoppingService,
  ) { }

  ngOnInit(): void {
    this.recipeService.recipe.subscribe((recipe: DtoRecipe) => {
      this.recipe = recipe;
    })
  }

  addRecipe(recipe: DtoIngredient[] | undefined) {
    if(recipe) this.shoppingService.addIngredient(recipe);
  }
}
