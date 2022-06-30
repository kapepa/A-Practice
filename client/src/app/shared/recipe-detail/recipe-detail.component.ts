import {Component, Input, OnInit} from '@angular/core';
import { RecipeService } from "../../service/recipe.service";
import {DtoRecipe} from "../../dto/dto.recipe";

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss']
})
export class RecipeDetailComponent implements OnInit {
  recipe: DtoRecipe = {} as DtoRecipe;
  @Input() recipeSelect!: DtoRecipe;

  constructor(
    private recipeService: RecipeService,
  ) { }

  ngOnInit(): void {
    this.recipeService.recipe.subscribe((recipe: DtoRecipe) => {
      this.recipe = recipe;
    })
  }
}
