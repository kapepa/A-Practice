import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipeListComponent } from './recipe-list.component';
import { RecipeItemModule } from "../recipe-item/recipe-item.module";
import {RouterModule} from "@angular/router";



@NgModule({
  declarations: [
    RecipeListComponent
  ],
  imports: [
    CommonModule,
    RecipeItemModule,
    RouterModule
  ],
  exports: [
    RecipeListComponent
  ]
})
export class RecipeListModule { }
