import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShoppingComponent } from './shopping.component';
import { HeaderModule } from "../../shared/header/header.module";
import { ShoppingListModule } from "../../shared/shopping-list/shopping-list.module";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  {
    path: '',
    component: ShoppingComponent
  }
];

@NgModule({
  declarations: [
    ShoppingComponent
  ],
  imports: [
    CommonModule,
    HeaderModule,
    ShoppingListModule,
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule,
  ]
})
export class ShoppingModule { }
