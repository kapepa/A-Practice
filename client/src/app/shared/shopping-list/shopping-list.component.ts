import {Component, OnDestroy, OnInit} from '@angular/core';
import {DtoIngredient, DtoRecipe} from "../../dto/dto.recipe";
import { RecipeService } from "../../service/recipe.service";
import {ShoppingService} from "../../service/shopping.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss']
})
export class ShoppingListComponent implements OnInit {
  ingredients: DtoIngredient[] = [] as DtoIngredient[];
  private ngIngredient!: Subscription;

  constructor(
    private recipeService: RecipeService,
    private shoppingService: ShoppingService
  ) {
    this.shoppingService.ingredient.subscribe((ingredients: DtoIngredient[]) => {
      this.ingredients = ingredients;
    })
  }

  ngOnInit(): void {
    this.shoppingService.getAllIngredient();

  }

  addIngredient(ingredient: DtoIngredient) {
    this.shoppingService.append(ingredient)
  };

  editIngredient(index: number) {
    this.shoppingService.selectEdit(index)
  }
}
