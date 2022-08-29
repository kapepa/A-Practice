import { Injectable } from '@angular/core';
import { DtoRecipe } from "../dto/dto.recipe";
import { Subject } from "rxjs";
import { HttpService } from "./http.service";
import { Router } from "@angular/router";
import { DtoQuery } from "../dto/dto.query";

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  selectIndex$: number | null = null;
  selectIndex: Subject<number | null> = new Subject<number | null>();

  recipe$: DtoRecipe = {} as DtoRecipe;
  recipe: Subject<DtoRecipe> = new Subject<DtoRecipe>();

  editRecipe$: DtoRecipe = {} as DtoRecipe;
  editRecipe: Subject<DtoRecipe> = new Subject<DtoRecipe>();

  recipes: DtoRecipe[] = [];
  recipesList = new Subject<DtoRecipe[]>();

  constructor(
    private httpService: HttpService,
    private router: Router,
  ) {}

  receiveRecipes(id: string){
    return this.httpService.getOneRecipe(id).subscribe((recipe: DtoRecipe) => {
      this.recipe$ = recipe;
      this.recipe.next(this.recipe$);
    })
  }

  updateRecipes(recipes: FormData) {
    this.httpService.updateRecipe(recipes).subscribe((recipes: DtoRecipe) => {
      this.recipes.splice( Number(this.editRecipe$),1, recipes );
      this.recipesList.next(this.recipes);

      this.router.navigate([ '/recipe', recipes.id ]);
    })
  }

  getRecipeEdit(id: string) {
    this.httpService.getEditRecipe(id).subscribe((recipe: DtoRecipe) => this.setEdit(recipe))
  }

  setEdit(recipe: DtoRecipe): void {
    this.editRecipe$ = recipe;
    this.editRecipe.next(this.editRecipe$);
  }

  setIndex(index: number | null) {
    this.selectIndex$ = index;
    this.selectIndex.next(this.selectIndex$)
  }

  newRecipes(data: FormData) {
    this.httpService.createRecipe(data).subscribe((recipe: DtoRecipe) => {
      if(recipe.id) {
        this.recipes.unshift(recipe);
        this.recipesList.next(this.recipes);
      }
    })
  }

  deleteRecipes() {
    if(this.selectIndex$ !== null) {
      const id = this.recipes[this.selectIndex$].id;
      this.httpService.deleteRecipe(id).subscribe(() => {
        if(this.selectIndex !== null){
          this.recipes.splice(Number(this.selectIndex$),1);
          this.selectIndex$ = null;
          this.recipesList.next(this.recipes);
          this.editRecipe$ = {} as DtoRecipe;
        }
      })
    }
  }

  get getRecipesAll() {
    return this.recipes;
  }

  getAllRecipe(query?: DtoQuery) {
    this.httpService.getAllRecipe(query).subscribe(( recipe: DtoRecipe[] ) => {
      this.recipes = recipe;
      this.recipesList.next(this.recipes);
    })
  }
}
