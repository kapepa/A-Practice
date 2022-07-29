import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropDirective } from "./drop.directive";
import { AlertDirective } from './alert.directive';
import { AuthDirective } from './auth.directive';
import { ErrorDirective } from './error.directive';

@NgModule({
  declarations: [
    DropDirective,
    AlertDirective,
    AuthDirective,
    ErrorDirective,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    DropDirective,
    AlertDirective,
    AuthDirective,
    ErrorDirective,
  ]
})
export class DirectiveModule { }
