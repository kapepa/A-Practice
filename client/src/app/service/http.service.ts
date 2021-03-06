import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { catchError, Observable, tap, throwError } from "rxjs";
import { CookieService } from "ngx-cookie-service";
import {DtoIngredient, DtoRecipe} from "../dto/dto.recipe";
import { DtoQuery } from "../dto/dto.query";
import { ErrorService } from "./error.service";
import { DtoErrorResponse } from "../dto/dto.common";
import {Router} from "@angular/router";
import {DtoUser} from "../dto/dto.user";

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private url = environment.configUrl;

  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
    private errorService: ErrorService,
    private router: Router,
  ) { };

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('An error occurred:', error.error);
    } else {
      console.error(`Backend returned code ${error.status}, body was: `, error.error);
    }
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }

  private clientError (error: { statusCode: number, message: string }) {
    this.errorService.setError({ open: true, title: 'Error', desc: error.message})
  }

  private setToken(token: string) {
    this.cookieService.set('token', token);
  }

  private createQuery(query: DtoQuery): string {
    let queryStr = '';
    for(let key of Object.keys(query)) queryStr = `${queryStr}&${key}=${query[key as keyof DtoQuery]}`;

    return `?${queryStr.substring(1,)}`;
  }

  createUser(data: FormData): Observable<{create: boolean} & DtoErrorResponse> {
    return this.http.post<{create: boolean} & DtoErrorResponse>(`${this.url}/api/user/create`, data).pipe(
      tap({
        next: (data) => { if(data.response) this.clientError(data.response) },
        error: (error) => this.clientError(error)
      }),
      catchError(this.handleError),
    );
  }

  loginUser(data: {email: string, password: string}): Observable<{access_token: string} & DtoErrorResponse> {
    return this.http.post<{access_token: string} & DtoErrorResponse>(`${this.url}/api/auth/login`,data).pipe(
      tap({
        next: (data) => {
          if(data.access_token) this.setToken(data.access_token);
          if(data.response) this.clientError(data.response)
        },
        error: (error) => this.clientError(error),
      }),
      catchError(this.handleError),
    )
  }

  getOwnProfile(): Observable<DtoUser> {
    return this.http.get<DtoUser>(`${this.url}/api/user`).pipe(
      tap({ error: (error) => this.clientError(error) }),
      catchError(this.handleError)
    )
  }

  getOneRecipe(id: string): Observable<DtoRecipe & DtoErrorResponse> {
    return this.http.get<DtoRecipe & DtoErrorResponse>(`${this.url}/api/recipe/one/${id}`).pipe(
      tap({
        next: (data) => {
          if(data.response) this.clientError(data.response);
          return data
        },
        error: (error) => this.clientError(error)
      }),
      catchError(this.handleError)
    )
  }

  getEditRecipe(id: string): Observable<DtoRecipe & DtoErrorResponse> {
    return this.http.get<DtoRecipe & DtoErrorResponse>(`${this.url}/api/recipe/edit/${id}`).pipe(
      tap({
        next: (data) => {
          if(data.response) this.router.navigate(['/recipe'])
          return data
        },
        error: (error) => this.clientError(error)
      }),
      catchError(this.handleError)
    )
  }

  getAllRecipe(query?: DtoQuery): Observable<DtoRecipe[]> {
    const compileQuery = query && !!Object.keys(query).length ? this.createQuery(query) : '';
    return this.http.get<DtoRecipe[] & DtoErrorResponse>(`${this.url}/api/recipe${compileQuery}`).pipe(
      tap({
        error: (error) => this.clientError(error)
      }),
      catchError(this.handleError)
    )
  }

  createRecipe(data: FormData): Observable<DtoRecipe & DtoErrorResponse> {
    return this.http.post<DtoRecipe & DtoErrorResponse>(`${this.url}/api/recipe/create`, data).pipe(
      tap({
        next: (data) => { if(data.response) this.clientError(data.response) },
        error: (error) => this.clientError(error)
      }),
      catchError(this.handleError)
    )
  }

  updateRecipe(data: FormData): Observable<DtoRecipe & DtoErrorResponse> {
    return this.http.patch<DtoRecipe & DtoErrorResponse>(`${this.url}/api/recipe/update`, data).pipe(
      tap({
        next: (data) => { if(data.response) this.clientError(data.response) },
        error: (error) => this.clientError(error)
      }),
      catchError(throwError)
    )
  }

  deleteRecipe(id: string): Observable<{ delete: boolean } & DtoErrorResponse> {
    return this.http.delete<{ delete: boolean } & DtoErrorResponse>(`${this.url}/api/recipe/${id}`).pipe(
      tap({
        next: (data) => { if(data.response) this.clientError(data.response) },
        error: (error) => this.clientError(error),
      }),
      catchError(this.handleError)
    );
  }

  getAllIngredient(query?: DtoQuery): Observable<DtoIngredient[] & DtoErrorResponse> {
    const compileQuery = query && !!Object.keys(query).length ? this.createQuery(query) : '';
    return this.http.get<DtoIngredient[] & DtoErrorResponse>(`${this.url}/api/recipe/ingredients${compileQuery}`).pipe(
      tap({
        error: (error) => this.clientError(error)
      }),
      catchError(this.handleError)
    )
  }

  createIngredient(data: FormData):Observable<DtoIngredient & DtoErrorResponse> {
    return this.http.post<DtoIngredient & DtoErrorResponse>(`${this.url}/api/recipe/ingredient/create`, data).pipe(
      tap({
        error: (error) => this.clientError(error)
      }),
      catchError(this.handleError)
    );
  }

  updateIngredient(data: FormData):Observable<DtoIngredient & DtoErrorResponse> {
    return this.http.patch<DtoIngredient & DtoErrorResponse>(`${this.url}/api/recipe/ingredient/update`, data).pipe(
      tap({
        error: (error) => this.clientError(error)
      }),
      catchError(this.handleError)
    )
  }

  deleteIngredient(id: string):Observable<{ delete: boolean } & DtoErrorResponse> {
    return this.http.delete<{ delete: boolean } & DtoErrorResponse>(`${this.url}/api/recipe/ingredient/${id}`).pipe(
      tap({
        error: (error) => this.clientError(error)
      }),
      catchError(this.handleError)
    )
  }
}
