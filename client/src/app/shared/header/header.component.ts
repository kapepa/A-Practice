import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { UserService } from "../../service/user.service";
import { AlertDirective } from "../../directive/alert.directive";
import { AlertComponent } from "../../popup/alert/alert.component";
import { Subscription } from "rxjs";
import { AuthDirective } from "../../directive/auth.directive";
import { AuthComponent } from "../../popup/auth/auth.component";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  alert!: Subscription;
  login!: Subscription;
  @ViewChild(AuthDirective, {static: true}) appAuth!: AuthDirective;
  @ViewChild(AlertDirective, {static: true}) appAlert!: AlertDirective;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if(params['login'] && !this.alert) this.clickAuth();
      console.log(this.alert)
    });
  }

  ngOnDestroy() {
    if(this.alert) this.alert.unsubscribe();
  }

  logoutUser(e: Event) {
    this.userService.logoutUser();
  }

  get user() {
    return this.userService.user
  }

  clickAuth() {
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
