import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DropDirective} from "./drop.directive";

@NgModule({
  declarations: [
    DropDirective,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    DropDirective,
  ]
})
export class DirectiveModule { }
