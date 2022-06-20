import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutDefComponent } from "./layout/layout-def/layout-def.component";

const routes: Routes = [
  { path: '', children: [{ path: '', component: LayoutDefComponent }] },
  { path: '', redirectTo: '/', pathMatch: 'full' },
  // { path: '**', component: <component-name> }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
