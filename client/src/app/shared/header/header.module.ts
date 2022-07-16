import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component';
import { RouterModule } from "@angular/router";
import { DirectiveModule } from "../../directive/directive.module";
import { AuthModule } from "../../popup/auth/auth.module";
import { PipeModule } from "../../pipe/pipe.module";



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
  ],
  exports: [
    HeaderComponent
  ]
})
export class HeaderModule { }
