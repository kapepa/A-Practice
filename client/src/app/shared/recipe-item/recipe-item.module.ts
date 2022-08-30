import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipeItemComponent } from './recipe-item.component';
import { RouterModule } from "@angular/router";
import { PipeModule } from "../../pipe/pipe.module";
import { DirectiveModule } from "../../directive/directive.module";



@NgModule({
  declarations: [
    RecipeItemComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    PipeModule,
    DirectiveModule,
  ],
  exports: [
    RecipeItemComponent
  ]
})
export class RecipeItemModule { }
