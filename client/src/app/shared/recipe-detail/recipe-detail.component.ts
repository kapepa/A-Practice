import { Component, Input, OnInit } from '@angular/core';
import { RecipeService } from "../../service/recipe.service";
import { DtoIngredient, DtoRecipe } from "../../dto/dto.recipe";
import { ShoppingService } from "../../service/shopping.service";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {Title} from "@angular/platform-browser";


@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss']
})
export class RecipeDetailComponent implements OnInit {
  recipeSelect!: DtoRecipe | undefined;

  constructor(
    private titleService: Title,
    private recipeService: RecipeService,
    private shoppingService: ShoppingService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.titleService.setTitle('Recipe')
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.recipeService.receiveRecipes(params['id'])
    })
    this.recipeService.recipe.subscribe((recipe: DtoRecipe) => {
      this.recipeSelect = recipe;
    })
  }

  deleteRecipe(e: Event) {
    e.preventDefault();
    this.recipeService.deleteRecipes();
    this.router.navigate(['/recipe'])
  };
}
