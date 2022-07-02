import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutDefComponent } from './layout-def.component';
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "../../page/home/home.component";
import { HomeModule } from "../../page/home/home.module";
import { ShoppingComponent } from "../../page/shopping/shopping.component";
import { RecipeDetailComponent } from "../../shared/recipe-detail/recipe-detail.component";

const routes: Routes = [
  { path: 'recipe', component: HomeComponent, children:
    [
      { path: ':id', component: RecipeDetailComponent },
    ]
  },
  { path: 'shopping', component: ShoppingComponent },
  { path: '', redirectTo: '/recipe', pathMatch: 'full' },
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
    LayoutDefComponent,
  ]
})
export class LayoutDefModule { }
