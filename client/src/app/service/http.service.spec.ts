import { TestBed } from '@angular/core/testing';

import { HttpService } from './http.service';
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { CookieService } from "ngx-cookie-service";
import { ErrorService } from "./error.service";
import { Router } from "@angular/router";
import {ErrorComponent} from "../page/error/error.component";
import {RouterTestingModule} from "@angular/router/testing";

describe('HttpService', () => {

  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule, RouterTestingModule],
    declarations: [  ]
  }));

  it('should be created', () => {
    const service = TestBed.get(HttpService);
    expect(service).toBeTruthy();
  });

});
