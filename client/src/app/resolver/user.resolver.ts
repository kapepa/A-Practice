import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { HttpService } from "../service/http.service";
import { DtoUser } from "../dto/dto.user";

@Injectable({
  providedIn: 'root'
})
export class UserResolver implements Resolve<DtoUser> {
  constructor(
    private httpService: HttpService,
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<DtoUser> {
    return this.httpService.getOwnProfile();
  }
}
