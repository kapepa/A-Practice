import { Injectable } from '@angular/core';
import { HttpService } from "./http.service";
import { Router } from "@angular/router";
import { SpinnerService } from "./spinner.service";
import { Subject } from "rxjs";
import { DtoUser } from "../dto/dto.user";
import {CookieService} from "ngx-cookie-service";
import {DtoErrorResponse} from "../dto/dto.common";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user: DtoUser = {} as DtoUser
  user$: Subject<DtoUser> = new Subject<DtoUser>();

  constructor(
    private router: Router,
    private httpService: HttpService,
    private spinnerService: SpinnerService,
    private cookieService: CookieService,
  ) { }

  createUser(form: FormData, cb: () => void) {
    this.spinnerService.changeState();
    this.httpService.createUser(form).subscribe((data) => {
      if( data.create ) {
        this.router.navigate([], { queryParams: { login: 'login' } });
        this.spinnerService.changeState();
        cb();
      }
    }, (error: ErrorEvent) => {
      this.spinnerService.changeState();
    })
  }

  loginUser(login: { email: string, password: string }, cb: () => void){
    this.spinnerService.changeState();
    this.httpService.loginUser({ email: login.email, password: login.password }).subscribe((token) => {
      this.router.navigate(['/recipe'],{queryParams: {}});
      this.spinnerService.changeState();
      cb()
      this.getUser();
    },(error: ErrorEvent) => {
      this.spinnerService.changeState();
    })
  };

  getUser() {
    this.httpService.getOwnProfile().subscribe(( profile: DtoUser) => {
      this.user = profile;
      this.user$.next(this.user);
    })
  }

  setUser(user: DtoUser) {
    this.user = {...this.user, ...user};
    this.user$.next(this.user);
  }

  logoutUser() {
    this.user = {} as DtoUser;
    this.user$.next(this.user);
    this.cookieService.delete('token')
    this.router.navigate(['/'])
  }
}
