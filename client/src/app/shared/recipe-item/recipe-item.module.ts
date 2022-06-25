import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipeItemComponent } from './recipe-item.component';
import { RouterModule } from "@angular/router";



@NgModule({
  declarations: [
    RecipeItemComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
  ],
  exports: [
    RecipeItemComponent
  ]
})
export class RecipeItemModule { }
