import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { UserService } from "../../service/user.service";
import { AlertDirective } from "../../directive/alert.directive";
import { AlertComponent } from "../../popup/alert/alert.component";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  alert!: Subscription
  @ViewChild(AlertDirective, {static: true}) appAlert!: AlertDirective;
  popupLogin: 'login' | 'registration' = 'login';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if(params['login'] !== this.popupLogin) this.popupLogin = params['login'];
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

  clickDynamic() {
    const alertRef = this.appAlert.viewContainerRef;
    const alertComponent = alertRef.createComponent(AlertComponent);

    this.alert = alertComponent.instance.closeAlert.subscribe(() => {
      this.alert.unsubscribe();
      alertRef.clear();
    })
  }
}
