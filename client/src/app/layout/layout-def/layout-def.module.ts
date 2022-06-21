import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutDefComponent } from './layout-def.component';
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "../../page/home/home.component";
import { HomeModule } from "../../page/home/home.module";

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: '', redirectTo: '/', pathMatch: 'full' },
];

@NgModule({
  declarations: [
    LayoutDefComponent,
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    HomeModule,
  ],
  exports: [
    LayoutDefComponent
  ]
})
export class LayoutDefModule { }
