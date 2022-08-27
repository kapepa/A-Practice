import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component';
import { RouterModule } from "@angular/router";
import { DirectiveModule } from "../../directive/directive.module";
import { PipeModule } from "../../pipe/pipe.module";
import { AuthComponent } from "../../popup/auth/auth.component";
import { SpinnerComponent } from "../spinner/spinner.component";
import { ErrorComponent } from "../../popup/error/error.component";
import { SpinnerModule } from "../spinner/spinner.module";

@NgModule({
  declarations: [
    HeaderComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    DirectiveModule,
    PipeModule,
    SpinnerModule,
  ],
  entryComponents: [
    AuthComponent,
    SpinnerComponent,
    ErrorComponent,
  ],
  exports: [
    HeaderComponent
  ]
})
export class HeaderModule { }
