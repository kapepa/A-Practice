import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from "@angular/router";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { HttpService } from "../../service/http.service";
import { UserService } from "../../service/user.service";
import { ReCaptchaV3Service } from "ng-recaptcha";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  avatar!: File;
  siteKey = environment.recaptcha.siteKey;
  @ViewChild('avatarImg') avatarImg!: ElementRef
  @Input() popupLogin!: 'login' | 'registration';
  profileForm = new FormGroup({
    name: new FormControl('', [ Validators.required, Validators.minLength(3) ]),
    email: new FormControl('', [ Validators.required, Validators.email ]),
    password: new FormControl('', [ Validators.required, Validators.minLength(5) ]),
  });

  profileLogin = new FormGroup({
    email: new FormControl('', [ Validators.required, Validators.email ]),
    password: new FormControl('', [ Validators.required, Validators.minLength(5) ]),
  })

  constructor(
    private router: Router,
    private userService: UserService,
    private httpService: HttpService,
    private recaptchaV3Service: ReCaptchaV3Service,
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

  clickAvatar(inputFile: HTMLInputElement) { inputFile.click(); };

  onSubmit() {
    const { name, email, password } = this.profileForm.value
    const form = new FormData();
    if( !!name ) form.append('name', name);
    if( !!email ) form.append('email', email);
    if( !!password ) form.append('password', password);
    if( !!this.avatar ) form.append('avatar', this.avatar);

    this.userService.createUser(form, this.profileReset.bind(this))
  }

  public submitLogin(captchaResponse: string): void {
    // if( captchaResponse ) form.click();
  }

  public submitProfile(captchaResponse: string): void {
    // if( captchaResponse ) form.click();
  }

  public onLogin(e: Event) {
    e.preventDefault();
    const { email, password } = this.profileLogin.value
    if(!!email && !!password) this.userService.loginUser({ email, password }, this.profileReset.bind(this))
  }

  profileReset() {
    this.profileForm.reset();
  }

  loginReset() {
    this.profileLogin.reset()
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

  get emailLogin() { return this.profileLogin.get('email'); }

  get passwordLogin() { return this.profileLogin.get('password'); }

}
