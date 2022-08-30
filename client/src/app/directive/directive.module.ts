import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropDirective } from "./drop.directive";
import { AlertDirective } from './alert.directive';
import { AuthDirective } from './auth.directive';
import { ErrorDirective } from './error.directive';
import { SpinnerDirective } from './spinner.directive';
import { RecipeLinkDirective } from './recipe-link.directive';

@NgModule({
  declarations: [
    DropDirective,
    AlertDirective,
    AuthDirective,
    ErrorDirective,
    SpinnerDirective,
    RecipeLinkDirective,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    DropDirective,
    AlertDirective,
    AuthDirective,
    ErrorDirective,
    SpinnerDirective,
    RecipeLinkDirective,
  ]
})
export class DirectiveModule { }
