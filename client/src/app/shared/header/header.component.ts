import {Component,  OnInit,} from '@angular/core';
import {ActivatedRoute, Event, NavigationStart, Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  popupLogin: 'login' | 'registration' = 'login';

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if(params['login'] !== this.popupLogin) this.popupLogin = params['login'];
    });
  }


}
