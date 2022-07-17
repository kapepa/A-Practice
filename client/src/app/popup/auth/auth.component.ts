import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import { Router } from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import { Subject } from "rxjs";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  avatar!: File;
  @ViewChild('avatarImg') avatarImg!: ElementRef
  @Input() popupLogin!: 'login' | 'registration';
  profileForm = new FormGroup({
    name: new FormControl('', [ Validators.required, Validators.minLength(3) ]),
    email: new FormControl('', [ Validators.required, Validators.email ]),
    password: new FormControl('', [ Validators.required, Validators.minLength(5) ]),
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
    const { name, email, password } = this.profileForm.value
    const form = new FormData();
    if( !!name ) form.append('name', name);
    if( !!email ) form.append('email', email);
    if( !!password ) form.append('password', password);
    if( !!this.avatar ) form.append('avatar', this.avatar);

    console.log(form)
  }

  clickAvatar(inputFile: HTMLInputElement) { inputFile.click(); };

  profileReset() {
    this.profileForm.reset();
  }

  loadAvatar(e: Event) {
    const file = e.target as HTMLInputElement;
    if (file.files && file.files[0]){
      this.avatarImg.nativeElement.src = URL.createObjectURL(file.files[0]);
      this.avatar = file.files[0];
    }
  }

  get name() { return this.profileForm.get('name'); }

  get email() { return this.profileForm.get('email'); }

  get password() { return this.profileForm.get('password'); }

}
