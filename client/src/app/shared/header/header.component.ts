import {Component, OnInit, OnDestroy, ViewChild, ComponentFactoryResolver, ViewContainerRef} from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { UserService } from "../../service/user.service";
import { AlertDirective } from "../../directive/alert.directive";
import { AlertComponent } from "../../popup/alert/alert.component";
import { Subscription } from "rxjs";
import { AuthDirective } from "../../directive/auth.directive";
import { AuthComponent } from "../../popup/auth/auth.component";
import {DtoErrorPopup} from "../../dto/dto.common";
import {ErrorService} from "../../service/error.service";
import {ErrorDirective} from "../../directive/error.directive";
import {ErrorComponent} from "../../popup/error/error.component";
import {SpinnerService} from "../../service/spinner.service";
import {SpinnerDirective} from "../../directive/spinner.directive";
import {SpinnerComponent} from "../spinner/spinner.component";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  alert!: Subscription;
  login!: Subscription;
  error!: Subscription;
  spinner!: Subscription;
  @ViewChild(AuthDirective, {static: true}) appAuth!: AuthDirective;
  @ViewChild(AlertDirective, {static: true}) appAlert!: AlertDirective;
  @ViewChild(ErrorDirective, {static: true}) appError!: ErrorDirective;
  @ViewChild(SpinnerDirective, {static: true}) appSpinner!: SpinnerDirective;
  spinnerRef!: ViewContainerRef;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService,
    private errorService: ErrorService,
    private spinnerService: SpinnerService,
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if(params['login'] && (!this.login || this.login?.closed)) this.invokeAuth();
    });
    this.spinnerService.spinner.subscribe(( bool: boolean ) => {
      if(this.spinnerRef) this.spinnerRef.clear();

      if(bool){
        this.spinnerRef = this.appSpinner.viewContainerRef;
        const spinnerComponent = this.spinnerRef.createComponent(SpinnerComponent);
        spinnerComponent.instance.spinner = true;
      }
    })
    this.errorService.isErrorSubject.subscribe(( error: DtoErrorPopup ) => {
      const errorRef = this.appError.viewContainerRef;
      const errorComponent = errorRef.createComponent(ErrorComponent);


      errorComponent.instance.isError = error;
      this.error = errorComponent.instance.close.subscribe(() => {
        this.error.unsubscribe();
        this.errorService.restError();
        errorRef.clear();
      })
    })
  }

  ngOnDestroy() {
    if(!!this.alert) this.alert.unsubscribe();
    if(!!this.login) this.login.unsubscribe();
    if(!!this.error) this.error.unsubscribe();
  }

  logoutUser(e: Event) {
    this.userService.logoutUser();
  }

  get user() {
    return this.userService.user;
  }

  invokeAuth() {
    const loginRef = this.appAuth.viewContainerRef;
    const authComponent = loginRef.createComponent(AuthComponent);

    this.login = authComponent.instance.close.subscribe(() => {
      this.login.unsubscribe();
      loginRef.clear();
      this.router.navigate([], { queryParams: { }});
    })
  }

  clickDynamic() {
    const alertRef = this.appAlert.viewContainerRef;
    const alertComponent = alertRef.createComponent(AlertComponent);

    this.alert = alertComponent.instance.closeAlert.subscribe(() => {
      this.alert.unsubscribe();
      alertRef.clear();
    })
  }
}
