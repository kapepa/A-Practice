import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RECAPTCHA_V3_SITE_KEY, RecaptchaModule, RecaptchaV3Module } from "ng-recaptcha";
import { environment } from "../../../environments/environment";

@NgModule({
  declarations: [
    AuthComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RecaptchaV3Module,
    RecaptchaModule,
  ],
  exports: [
    AuthComponent,
  ],
  providers: [
    {
      provide: RECAPTCHA_V3_SITE_KEY,
      useValue: environment.recaptcha.siteKey,
    },
  ]
})
export class AuthModule { };
