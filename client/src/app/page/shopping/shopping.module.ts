import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShoppingComponent } from './shopping.component';
import { HeaderModule } from "../../shared/header/header.module";
import {ShoppingListModule} from "../../shared/shopping-list/shopping-list.module";



@NgModule({
  declarations: [
    ShoppingComponent
  ],
  imports: [
    CommonModule,
    HeaderModule,
    ShoppingListModule,
  ],
})
export class ShoppingModule { }
