import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateComponent } from './create.component';
import { HeaderModule } from "../../shared/header/header.module";
import { ShoppingListModule } from "../../shared/shopping-list/shopping-list.module";



@NgModule({
  declarations: [
    CreateComponent
  ],
  imports: [
    CommonModule,
    HeaderModule,
    ShoppingListModule,
  ]
})
export class CreateModule { }
