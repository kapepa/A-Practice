import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';
import { HttpService } from "../service/http.service";
import { DtoRecipe } from "../dto/dto.recipe";

@Injectable({
  providedIn: 'root'
})
export class EditResolver implements Resolve<DtoRecipe> {
  constructor(
    private httpService: HttpService,
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<DtoRecipe> {
    return this.httpService.getEditRecipe(route.params['id'])
  }
}
