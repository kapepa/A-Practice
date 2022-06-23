import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipeItemComponent } from './recipe-item.component';



@NgModule({
  declarations: [
    RecipeItemComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    RecipeItemComponent
  ]
})
export class RecipeItemModule { }