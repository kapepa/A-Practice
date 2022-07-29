import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropDirective } from "./drop.directive";
import { AlertDirective } from './alert.directive';

@NgModule({
  declarations: [
    DropDirective,
    AlertDirective,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    DropDirective,
    AlertDirective,
  ]
})
export class DirectiveModule { }
