import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BsDropdownModule} from 'ngx-bootstrap/dropdown';
import 'ngx-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutDefModule } from "./layout/layout-def/layout-def.module";
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { ErrorComponent } from "./page/error/error.component";
import { HomeModule } from "./page/home/home.module";
import { HeaderModule } from "./shared/header/header.module";
import { CreateModule } from "./page/create/create.module";
import { ShoppingModule } from "./page/shopping/shopping.module";
import { DirectiveModule } from "./directive/directive.module";
import { EditModule } from "./shared/edit/edit.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import { PipeModule } from "./pipe/pipe.module";
import { AuthInterceptorProviders } from "./interceptor/auth.interceptor";
import { CookieService } from 'ngx-cookie-service';
import { ErrorModule } from "./popup/error/error.module";
import { AuthModule } from "./popup/auth/auth.module";

@NgModule({
  declarations: [
    AppComponent,
    ErrorComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HomeModule,
    EditModule,
    HeaderModule,
    CreateModule,
    DirectiveModule,
    FormsModule,
    HttpClientModule,
    PipeModule,
    AuthModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
    BsDropdownModule.forRoot()
  ],
  providers: [
    CookieService,
    AuthInterceptorProviders,
    HttpClient,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { };
