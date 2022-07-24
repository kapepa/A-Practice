import { EventEmitter, Injectable } from '@angular/core';
import { DtoIngredient } from "../dto/dto.recipe";
import {Subject} from "rxjs";
import {HttpService} from "./http.service";

@Injectable({
  providedIn: 'root'
})
export class ShoppingService {
  ingredientList: DtoIngredient[] = []
  ingredient: Subject<DtoIngredient[]> = new Subject<DtoIngredient[]>();

  editIngredient: Subject<DtoIngredient> = new Subject<DtoIngredient>();
  editIndex: Subject<number | null> = new Subject<number | null>();
  private editIndex$: number | null = null

  constructor(
    private httpService: HttpService
  ) {}

  getAllIngredient(take = 5, skip = 0) {
    this.httpService.getAllIngredient({ take, skip }).subscribe((ingredients: DtoIngredient[]) => {
      this.ingredientList.push(...ingredients);
      this.ingredient.next(this.ingredientList);
    })
  }

  createIngredient(data: FormData, cd: () => void) {
    this.httpService.createIngredient(data).subscribe((ingredient: DtoIngredient) => {
      this.ingredientList.push(ingredient);
      this.ingredient.next(this.ingredientList);
      cd();
    })
  }

  updateIngredient(data: FormData, cd: () => void) {
    this.httpService.updateIngredient(data).subscribe((ingredient: DtoIngredient) => {
      console.log(this.editIndex$)
      cd()
    })
  }

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
    if(exist) return;

    this.ingredientList = this.ingredientList.concat(ingredient);
    this.ingredient.next(this.ingredientList);
  }

  deleteIngredient() {
     if( this.editIndex$ !== null ) {
       this.selectEdit(null);
       this.ingredientList.splice(this.editIndex$,1);
       this.ingredient.next(this.ingredientList);
       this.selectEdit(null);
     }
  }

  selectEdit(index: number | null) {
    this.editIndex$ = index;
    this.editIndex.next(index);
    this.editIngredient.next(index !== null ? this.ingredientList[index] : {} as DtoIngredient);
  }

}
