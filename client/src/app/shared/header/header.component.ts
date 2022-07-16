import {Component,  OnInit,} from '@angular/core';
import {ActivatedRoute, Event, NavigationStart, Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  popupLogin: boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const login = params['login'] ? JSON.parse(params['login']) : false;
      if(login !== this.popupLogin) this.popupLogin = login;
    });
  }


}
