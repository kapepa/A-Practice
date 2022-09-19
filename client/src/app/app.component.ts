import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { UserService } from "./service/user.service";
import {SwUpdate, VersionReadyEvent} from "@angular/service-worker";
import {filter} from "rxjs";

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent implements OnInit{
  title = 'client';

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private updates: SwUpdate
  ) {
    updates.versionUpdates.subscribe(evt => {
      if ( evt.type === 'VERSION_DETECTED' ) document.location.reload();
    })
  }

  ngOnInit() {
    const user = this.route.snapshot.data['user'];
    if(user) this.userService.setUser(user);
  }
}
