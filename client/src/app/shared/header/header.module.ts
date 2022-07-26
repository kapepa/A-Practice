import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component';
import { RouterModule } from "@angular/router";
import { DirectiveModule } from "../../directive/directive.module";
import { AuthModule } from "../../popup/auth/auth.module";
import { PipeModule } from "../../pipe/pipe.module";
import { ErrorModule } from "../../popup/error/error.module";
import { SpinnerModule } from "../spinner/spinner.module";


@NgModule({
  declarations: [
    HeaderComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    DirectiveModule,
    AuthModule,
    PipeModule,
    ErrorModule,
    SpinnerModule,
  ],
  exports: [
    HeaderComponent
  ]
})
export class HeaderModule { }
