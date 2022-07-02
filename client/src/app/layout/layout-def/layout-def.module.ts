import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutDefComponent } from './layout-def.component';
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "../../page/home/home.component";
import { HomeModule } from "../../page/home/home.module";
import { ShoppingComponent } from "../../page/shopping/shopping.component";
import { RecipeDetailComponent } from "../../shared/recipe-detail/recipe-detail.component";
import { EditComponent } from "../../shared/edit/edit.component";
import { EditModule } from "../../shared/edit/edit.module";

const routes: Routes = [
  { path: 'recipe', component: HomeComponent, children:
    [
      { path: 'new', component: EditComponent },
      { path: ':id', component: RecipeDetailComponent },
      { path: ':id/edit', component: EditComponent }
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
    EditModule,
  ],
  exports: [
    LayoutDefComponent,
  ]
})
export class LayoutDefModule { }
