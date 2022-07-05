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
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: DtoIngredient[] = [] as DtoIngredient[];
  private ngIngredient!: Subscription;

  constructor(
    private recipeService: RecipeService,
    private shoppingService: ShoppingService
  ) { }

  ngOnInit(): void {
    this.ingredients = this.shoppingService.ingredientList;
    this.ngIngredient = this.shoppingService.ingredient.subscribe((ingredient: DtoIngredient[]) => {
      this.ingredients = ingredient;
    })
    // this.recipeService.recipe.subscribe((recipe: DtoRecipe) => {
    //   const ingredients = recipe.ingredients
    //   if( !!ingredients ) this.ingredients = ingredients;
    // })
  }

  ngOnDestroy() {
    this.ngIngredient.unsubscribe();
  }


  addIngredient(ingredient: DtoIngredient) {
    this.shoppingService.append(ingredient)
  };

  editIngredient(index: number) {
    this.shoppingService.selectEdit(index)
  }
}
