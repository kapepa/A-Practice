import { Component, OnInit } from '@angular/core';
import {DtoRecipe} from "../../dto/dto.recipe";

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent implements OnInit {
  recipes: DtoRecipe[] = [];
  constructor() { }

  ngOnInit(): void {
  }

}
