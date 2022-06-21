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
import { HeaderComponent } from "./shared/header/header.component";
import {HeaderModule} from "./shared/header/header.module";

@NgModule({
  declarations: [
    AppComponent,
    ErrorComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LayoutDefModule,
    HomeModule,
    HeaderModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
    BsDropdownModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
