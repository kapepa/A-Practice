import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipeDetailComponent } from './recipe-detail.component';



@NgModule({
  declarations: [
    RecipeDetailComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    RecipeDetailComponent
  ]
})
export class RecipeDetailModule { }
