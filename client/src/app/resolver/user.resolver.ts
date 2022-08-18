import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { HttpService } from "../service/http.service";
import { DtoUser } from "../dto/dto.user";
import { CookieService } from "ngx-cookie-service";

@Injectable({
  providedIn: 'root'
})
export class UserResolver implements Resolve<DtoUser> {
  token: string | undefined;

  constructor(
    private httpService: HttpService,
    private cookieService: CookieService,
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<DtoUser> {
    this.token = this.cookieService.get('token');
    return !!this.token ? this.httpService.getOwnProfile() : of({} as DtoUser);
  }
}
