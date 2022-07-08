import { Component, Input, OnInit } from '@angular/core';
import { RecipeService } from "../../service/recipe.service";
import { DtoIngredient, DtoRecipe } from "../../dto/dto.recipe";
import { ShoppingService } from "../../service/shopping.service";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { switchMap } from "rxjs";


@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss']
})
export class RecipeDetailComponent implements OnInit {
  // recipe: DtoRecipe = {} as DtoRecipe;
  // @Input() recipeSelect!: DtoRecipe;
  recipeSelect!: DtoRecipe | undefined;

  constructor(
    private recipeService: RecipeService,
    private shoppingService: ShoppingService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    // this.recipeService.recipe.subscribe((recipe: DtoRecipe) => {
    //   this.recipe = recipe;
    // })
    this.route.params.subscribe(params => {
      this.recipeSelect = this.recipeService.receiveRecipes(params['id'])
    })
  }

  addRecipe(recipe: DtoIngredient[] | undefined) {
    if(!!recipe) this.shoppingService.addIngredient(recipe);
  }
}
