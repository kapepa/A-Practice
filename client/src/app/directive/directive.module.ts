import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropDirective } from "./drop.directive";
import { AlertDirective } from './alert.directive';
import { AuthDirective } from './auth.directive';

@NgModule({
  declarations: [
    DropDirective,
    AlertDirective,
    AuthDirective,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    DropDirective,
    AlertDirective,
    AuthDirective,
  ]
})
export class DirectiveModule { }
