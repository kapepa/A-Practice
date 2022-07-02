import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DtoRecipe } from "../../dto/dto.recipe";
import { RecipeService } from "../../service/recipe.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent implements OnInit {
  recipes!: DtoRecipe[];
  // @Output() selectRecipe = new EventEmitter<DtoRecipe>()

  constructor(
    private recipeService: RecipeService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.recipes = this.recipeService.getRecipesAll;
  }

  recipeSelected (recipe: DtoRecipe) {
    this.recipeService.recipe.emit(recipe)
  }

  newRouter() {
    // this.router.navigate(['/recipe','new'])
    this.router.navigate(['new'], {relativeTo: this.route});
  }
}
