import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { HeaderModule } from "../../shared/header/header.module";
import { ShoppingListModule } from "../../shared/shopping-list/shopping-list.module";
import { RecipesModule } from "../../shared/recipes/recipes.module";

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    HeaderModule,
    RecipesModule,
    ShoppingListModule,
  ],
  exports: [
    HomeComponent,
  ]
})
export class HomeModule { }
