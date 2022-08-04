import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutDefComponent } from './layout-def.component';
import {PreloadAllModules, RouterModule, Routes} from "@angular/router";
import { HomeComponent } from "../../page/home/home.component";
import { HomeModule } from "../../page/home/home.module";
import { ShoppingComponent } from "../../page/shopping/shopping.component";
import { RecipeDetailComponent } from "../../shared/recipe-detail/recipe-detail.component";
import { EditComponent } from "../../shared/edit/edit.component";
import { EditModule } from "../../shared/edit/edit.module";
import { AccessEditGuard } from "../../guard/access-edit.guard";
import { ErrorModule } from "../../popup/error/error.module";
import { EditResolver } from "../../resolver/edit.resolver";

const routes: Routes = [
  { path: 'recipe', component: HomeComponent, children:
    [
      { path: '', component: RecipeDetailComponent},
      { path: 'new', component: EditComponent },
      { path: ':id', component: RecipeDetailComponent },
      { path: ':id/edit', component: EditComponent, resolve: { recipe: EditResolver } },
    ],
  },
  {
    path: 'shopping',
    component: ShoppingComponent,
    canActivate: [ AccessEditGuard ]
  },
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
    ErrorModule,
  ],
  exports: [
    LayoutDefComponent,
    RouterModule,
  ]
})
export class LayoutDefModule { }
