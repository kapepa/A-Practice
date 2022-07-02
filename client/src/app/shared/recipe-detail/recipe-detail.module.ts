import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipeDetailComponent } from './recipe-detail.component';
import { DirectiveModule } from "../../directive/directive.module";
import {RouterModule} from "@angular/router";



@NgModule({
  declarations: [
    RecipeDetailComponent,
  ],
  imports: [
    CommonModule,
    DirectiveModule,
    RouterModule,
  ],
  exports: [
    RecipeDetailComponent
  ]
})
export class RecipeDetailModule { }
