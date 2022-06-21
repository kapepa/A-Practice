import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipesComponent } from './recipes.component';
import { RecipeListModule } from "../recipe-list/recipe-list.module";
import { RecipeDetailModule } from "../recipe-detail/recipe-detail.module";



@NgModule({
  declarations: [
    RecipesComponent
  ],
  imports: [
    CommonModule,
    RecipeListModule,
    RecipeDetailModule,
  ],
  exports: [
    RecipesComponent
  ]
})
export class RecipesModule { }
