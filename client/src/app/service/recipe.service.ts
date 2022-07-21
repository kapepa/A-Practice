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
  selectIndex: number | null = null;
  recipe: Subject<DtoRecipe> = new Subject<DtoRecipe>();
  editRecipe$: DtoRecipe = {} as DtoRecipe;
  editRecipe: Subject<DtoRecipe> = new Subject<DtoRecipe>();

  private recipes: DtoRecipe[] = [];
  recipesList = new Subject<DtoRecipe[]>();

  constructor(
    private httpService: HttpService,
    private router: Router,
  ) {}

  receiveRecipes(id: string){
    return this.recipes.find((recipe: DtoRecipe) => recipe.id === id);
  }

  updateRecipes(recipes: FormData) {
    this.httpService.updateRecipe(recipes).subscribe((recipes: DtoRecipe) => {
      this.recipes.splice( Number(this.editRecipe$),1, recipes);
      this.recipesList.next(this.recipes);
      this.router.navigate([ '/recipe', recipes.id ])
    })
  }

  setEdit(id: string) {
    this.httpService.getOneRecipe(id).subscribe((recipe: DtoRecipe) => {
      this.editRecipe$ = recipe;
      this.editRecipe.next(recipe);
    })
  }

  setIndex(index: number | null) {
    this.selectIndex = index;
  }

  newRecipes(data: FormData) {
    this.httpService.createRecipe(data).subscribe((recipe: DtoRecipe) => {
      this.recipes.unshift(recipe);
      this.recipesList.next(this.recipes);
    })
  }

  deleteRecipes() {
    if(this.selectIndex !== null) {
      this.recipes.splice(this.selectIndex,1);
      this.selectIndex = null;
      this.recipesList.next(this.recipes);
      this.editRecipe$ = {} as DtoRecipe;
    }
  }

  get getRecipesAll() {
    return this.recipes;
  }

  get getRecipeSelect() {
    return this.recipe;
  }

  getAllRecipe(query?: DtoQuery) {
    this.httpService.getAllRecipe(query).subscribe(( recipe: DtoRecipe[] ) => {
      this.recipes = recipe;
      this.recipesList.next(this.recipes);
    })
  }
}
