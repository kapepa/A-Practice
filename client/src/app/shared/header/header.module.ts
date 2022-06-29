import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component';
import { RouterModule } from "@angular/router";
import { DropDirective } from "../../directive/drop.directive";



@NgModule({
  declarations: [
    HeaderComponent,
    DropDirective,
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    HeaderComponent
  ]
})
export class HeaderModule { }
