import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipeDetailComponent } from './recipe-detail.component';
import { DirectiveModule } from "../../directive/directive.module";
import { RouterModule } from "@angular/router";
import { PipeModule } from "../../pipe/pipe.module";



@NgModule({
  declarations: [
    RecipeDetailComponent,
  ],
  imports: [
    CommonModule,
    DirectiveModule,
    RouterModule,
    PipeModule,
  ],
  exports: [
    RecipeDetailComponent
  ]
})
export class RecipeDetailModule { }
