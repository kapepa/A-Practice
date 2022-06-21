import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorComponent } from "./page/error/error.component";

const routes: Routes = [
  { path: '', loadChildren: () => import('./layout/layout-def/layout-def.module').then(m => m.LayoutDefModule) },
  { path: '', redirectTo: '/', pathMatch: 'full' },
  { path: '**', component: ErrorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
