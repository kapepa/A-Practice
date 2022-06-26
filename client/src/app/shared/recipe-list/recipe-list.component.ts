import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { DtoRecipe } from "../../dto/dto.recipe";
import { RecipeService } from "../../service/recipe.service";

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent implements OnInit {
  recipes!: DtoRecipe[];
  @Output() selectRecipe = new EventEmitter<DtoRecipe>()

  constructor(
    private recipeService: RecipeService,
  ) { }

  ngOnInit(): void {
    this.recipes = this.recipeService.recipes
  }

  recipeSelected (recipe: DtoRecipe) {
    this.selectRecipe.emit(recipe)
  }
}
