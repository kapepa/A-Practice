import { EventEmitter, Injectable } from '@angular/core';
import { DtoIngredient } from "../dto/dto.recipe";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ShoppingService {
  ingredientList: DtoIngredient[] = [
    { name: 'ingredient-name', amount: 120 },
    { name: 'ingredient-alias', amount: 100 },
  ]
  // ingredient: EventEmitter<DtoIngredient[]> = new EventEmitter<DtoIngredient[]>()
  ingredient: Subject<DtoIngredient[]> = new Subject<DtoIngredient[]>();
  editIngredient: Subject<DtoIngredient> = new Subject<DtoIngredient>();
  editIndex: Subject<number | null> = new Subject<number | null>();
  private editIndex$: number | null = null

  append(ingredient: DtoIngredient) {
    if(this.editIndex$ === null){
      this.ingredientList.push(ingredient)
      this.ingredient.next(this.ingredientList);
    } else {
      this.ingredientList.splice(this.editIndex$,1, ingredient);
      this.ingredient.next(this.ingredientList);
    }
  }

  addIngredient(ingredient: DtoIngredient[]) {
    const exist = ingredient.some(
      ( ing: DtoIngredient ) => this.ingredientList.some(( list: DtoIngredient ) => ing.name === list.name));
    if(!exist) return;

    this.ingredientList = this.ingredientList.concat(ingredient);
    this.ingredient.next(this.ingredientList);
  }

  selectEdit(index: number) {
    this.editIndex$ = index;
    this.editIndex.next(index);
    this.editIngredient.next(this.ingredientList[index]);
  }

}
