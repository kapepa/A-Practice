import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { catchError, Observable, of, tap, throwError } from "rxjs";
import { CookieService } from "ngx-cookie-service";
import { DtoIngredient, DtoRecipe } from "../dto/dto.recipe";
import { DtoQuery } from "../dto/dto.query";
import { ErrorService } from "./error.service";
import { DtoErrorResponse } from "../dto/dto.common";
import { Router } from "@angular/router";
import { DtoUser } from "../dto/dto.user";

export interface Post {
  id: number;
  title: string;
  body: string;
}

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

  handleError(operation = 'operation') {
    return (error: HttpErrorResponse): Observable<any> => {
      if (error.error instanceof Event) {
        throw error.error;
      }

      const message = `server returned code ${error.status} with body "${error.error}"`;
      throw new Error(`${operation} failed: ${message}`);
    };
  }

  clientError(error: { statusCode: number, message: string }): void {
    this.errorService.setError({ open: true, title: 'Error', desc: error.message})
  }

  setToken(token: string) {
    this.cookieService.set('token', token);
  }

  createQuery(query: DtoQuery): string {
    let queryStr = '';
    for(let key of Object.keys(query)) queryStr = `${queryStr}&${key}=${query[key as keyof DtoQuery]}`;

    return `?${queryStr.substring(1,)}`;
  }

  createUser(data: FormData): Observable<{create: boolean} & DtoErrorResponse> {
    return this.http.post<{create: boolean} & DtoErrorResponse>(`${this.url}/api/user/create`, data).pipe(
      tap({
        next: (data) => {
          if( data.response ) this.clientError(data.response);
          return data
        },
        error: (error) => this.clientError(error)
      }),
      catchError(this.handleError('createUser')),
    );
  }

  loginUser(data: {email: string, password: string}): Observable<{access_token: string} & DtoErrorResponse> {
    return this.http.post<{access_token: string} & DtoErrorResponse>(`${this.url}/api/auth/login`,data).pipe(
      tap({
        next: (data) => {
          if(data.access_token) this.setToken(data.access_token);
          if(data.response) this.clientError(data.response)
          return data
        },
        error: (error) => this.clientError(error),
      }),
      catchError(this.handleError('loginUser')),
    )
  }

  getOwnProfile(): Observable<DtoUser> {
    return this.http.get<DtoUser>(`${this.url}/api/user`).pipe(
      tap({
        error: (error) => this.clientError(error)
      }),
      catchError(this.handleError('getOwnProfile'))
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
      catchError(this.handleError('getOneRecipe'))
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
      catchError(this.handleError('getEditRecipe'))
    )
  }

  getAllRecipe(query?: DtoQuery): Observable<DtoRecipe[]> {
    const compileQuery = query && !!Object.keys(query).length ? this.createQuery(query) : '';

    return this.http.get<DtoRecipe[] & DtoErrorResponse>(`${this.url}/api/recipe${compileQuery}`).pipe(
      tap({
        error: (error) => this.clientError(error)
      }),
      catchError(this.handleError('getAllRecipe'))
    )
  }

  createRecipe(data: FormData): Observable<DtoRecipe & DtoErrorResponse> {
    return this.http.post<DtoRecipe & DtoErrorResponse>(`${this.url}/api/recipe/create`, data).pipe(
      tap({
        next: (data) => { if(data.response) this.clientError(data.response) },
        error: (error) => this.clientError(error)
      }),
      catchError(this.handleError('createRecipe'))
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
      catchError(this.handleError('deleteRecipe'))
    );
  }

  getAllIngredient(query?: DtoQuery): Observable<DtoIngredient[] & DtoErrorResponse> {
    const compileQuery = query && !!Object.keys(query).length ? this.createQuery(query) : '';
    return this.http.get<DtoIngredient[] & DtoErrorResponse>(`${this.url}/api/recipe/ingredients${compileQuery}`).pipe(
      tap({
        error: (error) => this.clientError(error)
      }),
      catchError(this.handleError('getAllIngredient'))
    )
  }

  createIngredient(data: FormData):Observable<DtoIngredient & DtoErrorResponse> {
    return this.http.post<DtoIngredient & DtoErrorResponse>(`${this.url}/api/recipe/ingredient/create`, data).pipe(
      tap({
        error: (error) => this.clientError(error)
      }),
      catchError(this.handleError('createIngredient'))
    );
  }

  updateIngredient(data: FormData):Observable<DtoIngredient & DtoErrorResponse> {
    return this.http.patch<DtoIngredient & DtoErrorResponse>(`${this.url}/api/recipe/ingredient/update`, data).pipe(
      tap({
        error: (error) => this.clientError(error)
      }),
      catchError(this.handleError('updateIngredient'))
    )
  }

  deleteIngredient(id: string):Observable<{ delete: boolean } & DtoErrorResponse> {
    return this.http.delete<{ delete: boolean } & DtoErrorResponse>(`${this.url}/api/recipe/ingredient/${id}`).pipe(
      tap({
        error: (error) => this.clientError(error)
      }),
      catchError(this.handleError('deleteIngredient'))
    )
  }

}
