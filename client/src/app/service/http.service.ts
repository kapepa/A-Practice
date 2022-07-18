import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { catchError, Observable, tap, throwError } from "rxjs";
import { CookieService } from "ngx-cookie-service";

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private url = environment.configUrl;

  constructor(
    private http: HttpClient,
    private cookieService: CookieService
  ) { };

  createUser(data: FormData): Observable<boolean> {
    return this.http.post<boolean>(`${this.url}/api/user/create`, data).pipe(
      catchError(this.handleError)
    );
  }

  loginUser(data: {email: string, password: string}): Observable<any> {
    return this.http.post<{access_token: string}>(`${this.url}/api/auth/login`,data).pipe(
      tap((data) => this.setToken(data.access_token)),
      catchError(this.handleError)
    )
  }

  private setToken(token: string) {
    this.cookieService.set('token', token);
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('An error occurred:', error.error);
    } else {
      console.error(`Backend returned code ${error.status}, body was: `, error.error);
    }
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }

}
