import { EventEmitter, Injectable } from '@angular/core';
import { DtoIngredient } from "../dto/dto.recipe";

@Injectable({
  providedIn: 'root'
})
export class ShoppingService {
  ingredientList: DtoIngredient[] = [
    { name: 'ingredient-name', amount: 120 },
    { name: 'ingredient-alias', amount: 100 },
  ]
  ingredient: EventEmitter<DtoIngredient[]> = new EventEmitter<DtoIngredient[]>()

  append(ingredient: DtoIngredient) {
    this.ingredientList.push(ingredient)
    this.ingredient.emit(this.ingredientList);
  }

  addIngredient(ingredient: DtoIngredient[]) {
    const exist = ingredient.some(
      ( ing: DtoIngredient ) => this.ingredientList.some(( list: DtoIngredient ) => ing.name === list.name));
    if(!exist) return;

    this.ingredientList = this.ingredientList.concat(ingredient);
    this.ingredient.emit(this.ingredientList);
  }

}
