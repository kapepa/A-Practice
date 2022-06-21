import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShoppingListComponent } from './shopping-list.component';
import { ShoppingEditModule } from "../shopping-edit/shopping-edit.module";



@NgModule({
  declarations: [
    ShoppingListComponent
  ],
  imports: [
    CommonModule,
    ShoppingEditModule
  ],
  exports: [
    ShoppingListComponent
  ]
})
export class ShoppingListModule { }
