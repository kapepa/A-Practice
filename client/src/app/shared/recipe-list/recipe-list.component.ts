import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import { DtoRecipe } from "../../dto/dto.recipe";
import { RecipeService } from "../../service/recipe.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs";


@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes!: DtoRecipe[];
  recipesSub!: Subscription
  // @Output() selectRecipe = new EventEmitter<DtoRecipe>()

  constructor(
    private recipeService: RecipeService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.recipes = this.recipeService.getRecipesAll;
    this.recipesSub = this.recipeService.recipesList.subscribe((recipes: DtoRecipe[]) => {
      this.recipes = recipes;
    })
  }

  ngOnDestroy() {
    this.recipesSub.unsubscribe();
  }

  recipeSelected (recipe: DtoRecipe) {
    this.recipeService.recipe.next(recipe)
  }

  newRouter() {
    // this.router.navigate(['/recipe','new'])
    this.router.navigate(['new'], {relativeTo: this.route});
  }

  addEdit (index: number) {
    this.recipeService.setEdit(index);
  }
};
