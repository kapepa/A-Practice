import { Injectable } from '@angular/core';
import { DtoRecipe } from "../dto/dto.recipe";

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  public recipe: DtoRecipe = {
    name: 'My Recipe',
    description: 'Description Recipe',
    image:'https://static01.nyt.com/images/2021/03/28/dining/mc-shakshuka/mc-shakshuka-articleLarge.jpg',
    ingredients: [{ name: 'ingredient-name', amount: 120 }]
  };
  public name!: string;
  public description!: string;
  public image!: string;

  // constructor(name: string, description: string, image: string) {
  //   this.name = name;
  //   this.description = description;
  //   this.image = image;
  // }

}
