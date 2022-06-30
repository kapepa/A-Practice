import {EventEmitter, Injectable} from '@angular/core';
import { DtoRecipe } from "../dto/dto.recipe";

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  // private recipe: DtoRecipe = {
  //   name: 'My Recipe',
  //   description: 'Description Recipe',
  //   image:'https://static01.nyt.com/images/2021/03/28/dining/mc-shakshuka/mc-shakshuka-articleLarge.jpg',
  //   ingredients: [{ name: 'ingredient-name', amount: 120 }]
  // };
  recipe = new EventEmitter<DtoRecipe>();

  private recipes: DtoRecipe[] = [
    {
      name: 'My Recipe',
      description: 'Description Recipe',
      image:'https://static01.nyt.com/images/2021/03/28/dining/mc-shakshuka/mc-shakshuka-articleLarge.jpg',
      ingredients: [{ name: 'ingredient-name', amount: 120 }]
    },
    {
      name: 'Second Recipe',
      description: 'Second Recipe',
      image:'https://food.fnr.sndimg.com/content/dam/images/food/products/2022/3/11/rx_goldbelly-clinton-street-diner-zeus-burger.jpg.rend.hgtvcom.406.305.suffix/1647019464547.jpeg',
      ingredients: [{ name: 'ingredient-food', amount: 210 }]
    }
  ];

  get getRecipesAll() {
    return this.recipes;
  }

  get getRecipeSelect() {
    return this.recipe;
  }


  // constructor(name: string, description: string, image: string) {
  //   this.name = name;
  //   this.description = description;
  //   this.image = image;
  // }

}
