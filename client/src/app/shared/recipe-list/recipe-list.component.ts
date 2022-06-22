import { Component, OnInit } from '@angular/core';
import {DtoRecipe} from "../../dto/dto.recipe";
import {RecipeService} from "../../service/recipe.service";

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent implements OnInit {
  recipes: DtoRecipe[] = [
    { name: 'My Recipe', description: 'Description Recipe', image:'https://static01.nyt.com/images/2021/03/28/dining/mc-shakshuka/mc-shakshuka-articleLarge.jpg'}
    // new RecipeService('My Recipe', 'Description Recipe', 'https://static01.nyt.com/images/2021/03/28/dining/mc-shakshuka/mc-shakshuka-articleLarge.jpg')
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
