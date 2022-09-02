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
  editIndex$: number | null = null

  constructor(
    private httpService: HttpService
  ) {}

  getIngredientPage() {
    if(!this.ingredientList.length) this.getAllIngredient()
  }

  getIngredientRequest() {
    this.getAllIngredient(5,  this.ingredientList.length);
  }

  getAllIngredient(take = 5, skip = 0) {
    this.httpService.getAllIngredient({ take, skip }).subscribe((ingredients: DtoIngredient[]) => {
      this.ingredientList = this.ingredientList.concat(ingredients);
      this.ingredient.next(this.ingredientList);
    })
  }

  createIngredient(data: FormData, cd: () => void) {
    this.httpService.createIngredient(data).subscribe((ingredient: DtoIngredient) => {
      if(ingredient.id){
        this.ingredientList.push(ingredient);
        this.ingredient.next(this.ingredientList);
        cd();
      }
    })
  }

  updateIngredient(data: FormData, cd: () => void) {
    this.httpService.updateIngredient(data).subscribe((ingredient: DtoIngredient) => {
      if( this.editIndex$ ){
        this.ingredientList.splice( this.editIndex$, 1, ingredient );
        this.ingredient.next(this.ingredientList);
        cd();
      }
    })
  }

  deleteIngredient(cb: () => void) {
    const { id } = this.ingredientList[Number(this.editIndex$)]
    if( id ) this.httpService.deleteIngredient(id).subscribe((data: { delete: boolean }) => {
      this.ingredientList.splice(Number(this.editIndex$),1);
      this.ingredient.next(this.ingredientList);
      cb()
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

  selectEdit(index: number | null) {
    this.editIndex$ = index;
    this.editIndex.next(index);
    this.editIngredient.next(index !== null ? this.ingredientList[index] : {} as DtoIngredient);
  }

  get getIngredientList() {
    return this.ingredientList;
  }
}
