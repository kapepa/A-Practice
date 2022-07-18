import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HTTP_INTERCEPTORS, HttpHeaders, HttpErrorResponse
} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';
import { CookieService } from "ngx-cookie-service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private cookieService: CookieService,
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this.cookieService.get('token');
    request = request.clone({
      headers: request.headers.set('Authorization', `Bearer ${token}`)
    });
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        this.cookieService.delete('token')
        return throwError(() => new Error('Authorization token error.'));
      })
    );
  }
}

export const AuthInterceptorProviders = {
  provide : HTTP_INTERCEPTORS,
  useClass: AuthInterceptor,
  multi   : true,
}

