import { NgModule } from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import { ErrorComponent } from "./page/error/error.component";
import { UserResolver } from "./resolver/user.resolver";
import { AppComponent } from "./app.component";

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./layout/layout-def/layout-def.module').then(m => m.LayoutDefModule),
    component: AppComponent,
    resolve: { user: UserResolver },
  },
  { path: '', redirectTo: '/', pathMatch: 'full', },
  { path: '**', component: ErrorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule],
})
export class AppRoutingModule { };
