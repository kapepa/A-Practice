import { Component, Input, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { FormControl, FormGroup } from "@angular/forms";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  @Input() popupLogin!: 'login' | 'registration';
  profileForm = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    avatar: new FormControl(''),
  });

  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  closePopUp(e: Event) {
    const elem = e.target as HTMLDataElement;
    if( elem.classList.contains('popup__zone') || elem.classList.contains('popup__x-close') ){
      this.router.navigate([], { queryParams: { }});
    }
  }

  switchMode(mode: string) {
    if(mode === 'login' || mode === 'registration') this.router.navigate([], { queryParams: { login: mode }});
  }

  onSubmit() {
    console.log(this.profileForm.value)
  }

  loadAvatar(inputFile: HTMLInputElement) {
    inputFile.click();
  }

}
