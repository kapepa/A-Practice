import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipeDetailComponent } from './recipe-detail.component';
import { DirectiveModule } from "../../directive/directive.module";



@NgModule({
  declarations: [
    RecipeDetailComponent,
  ],
  imports: [
    CommonModule,
    DirectiveModule,
  ],
  exports: [
    RecipeDetailComponent
  ]
})
export class RecipeDetailModule { }
