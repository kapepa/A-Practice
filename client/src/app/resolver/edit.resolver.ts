import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import {Observable, of, tap} from 'rxjs';
import { RecipeService } from "../service/recipe.service";
import {HttpService} from "../service/http.service";
import {DtoRecipe} from "../dto/dto.recipe";

@Injectable({
  providedIn: 'root'
})
export class EditResolver implements Resolve<DtoRecipe> {
  constructor(
    private recipeService: RecipeService,
    private httpService: HttpService,
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<DtoRecipe> {
    return this.httpService.getEditRecipe(route.params['id'])
  }
}
