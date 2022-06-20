import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutDefComponent } from './layout-def.component';
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [];

@NgModule({
  declarations: [
    LayoutDefComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
  ],
  exports: [
    LayoutDefComponent
  ]
})
export class LayoutDefModule { }
