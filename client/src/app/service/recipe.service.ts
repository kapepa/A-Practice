import {EventEmitter, Injectable} from '@angular/core';
import { DtoRecipe } from "../dto/dto.recipe";
import {Subject} from "rxjs";
import {HttpService} from "./http.service";

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  selectIndex: number | null = null;
  recipe: Subject<DtoRecipe> = new Subject<DtoRecipe>();
  editRecipe$: DtoRecipe = {} as DtoRecipe;
  editRecipe: Subject<DtoRecipe> = new Subject<DtoRecipe>();

  private recipes: DtoRecipe[] = [
    {
      id: '123aa1xc42',
      name: 'My Recipe',
      description: 'Description Recipe',
      image:'https://static01.nyt.com/images/2021/03/28/dining/mc-shakshuka/mc-shakshuka-articleLarge.jpg',
      ingredients: [{ name: 'ingredient-name', amount: 120 }]
    },
    {
      id: '1aa231xc123123',
      name: 'Second Recipe',
      description: 'Second Recipe',
      image:'https://food.fnr.sndimg.com/content/dam/images/food/products/2022/3/11/rx_goldbelly-clinton-street-diner-zeus-burger.jpg.rend.hgtvcom.406.305.suffix/1647019464547.jpeg',
      ingredients: [{ name: 'ingredient-food', amount: 210 }]
    }
  ];
  recipesList = new Subject<DtoRecipe[]>();

  constructor(
    private httpService: HttpService
  ) {}

  receiveRecipes(id: string){
    return this.recipes.find((recipe: DtoRecipe) => recipe.id === id);
  }

  updateRecipes(recipes: DtoRecipe) {
    this.recipes.splice( Number(this.editRecipe$),1, recipes);
    this.recipesList.next(this.recipes);
  }

  setEdit(index: number) {
    const recipe: DtoRecipe = this.recipes[index];
    this.selectIndex = index;
    this.editRecipe$ = recipe;
    this.editRecipe.next(recipe);
  }

  newRecipes(recipes: DtoRecipe) {
    this.recipes.push(recipes);
    this.recipesList.next(this.recipes);
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

  getAllRecipe(query?: { take?: number, skip?: number, where?: string}) {
    this.httpService.getAllRecipe(query).subscribe(( recipe: DtoRecipe[] ) => {
    })
  }
}
