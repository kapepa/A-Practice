import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import {UserService} from "./service/user.service";

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent implements OnInit{
  title = 'client';

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
  ) {}

  ngOnInit() {
    const user = this.route.snapshot.data['user'];
    if(user) this.userService.setUser(user);
  }
}
