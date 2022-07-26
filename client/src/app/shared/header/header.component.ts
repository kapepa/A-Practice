import {Component,  OnInit,} from '@angular/core';
import {ActivatedRoute, NavigationStart, Router} from "@angular/router";
import {UserService} from "../../service/user.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
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

  logoutUser(e: Event) {
    this.userService.logoutUser();
  }

  get user() {
    return this.userService.user
  }
}
