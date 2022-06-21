import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipeListComponent } from './recipe-list.component';
import { RecipeItemModule } from "../recipe-item/recipe-item.module";



@NgModule({
  declarations: [
    RecipeListComponent
  ],
  imports: [
    CommonModule,
    RecipeItemModule
  ],
  exports: [
    RecipeListComponent
  ]
})
export class RecipeListModule { }
