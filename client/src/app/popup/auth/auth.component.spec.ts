import {ComponentFixture, fakeAsync, inject, TestBed, tick} from '@angular/core/testing';

import { AuthComponent } from './auth.component';
import { RouterTestingModule } from "@angular/router/testing";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { UserService } from "../../service/user.service";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { RECAPTCHA_V3_SITE_KEY, RecaptchaModule, RecaptchaV3Module } from "ng-recaptcha";
import { environment } from "../../../environments/environment";
import { BrowserModule, By } from "@angular/platform-browser";
import { ActivatedRoute, Router } from "@angular/router";
import { Subject } from "rxjs";
import {DtoRecipe} from "../../dto/dto.recipe";

describe('AuthComponent', () => {
  let component: AuthComponent;
  let fixture: ComponentFixture<AuthComponent>;

  let userServiceMock = jasmine.createSpyObj('UserService',
    ['createUser', 'loginUser'],
  );

  let activatedRouteMock = jasmine.createSpyObj('ActivatedRoute',
    [],
    { queryParams: new Subject(), },
  )

  beforeEach((() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserModule,
        HttpClientTestingModule,
        RouterTestingModule,
        ReactiveFormsModule,
        FormsModule,
        RecaptchaV3Module,
        RecaptchaModule,
      ],
      declarations: [
        AuthComponent,
      ],
      providers: [
        { provide: UserService, useValue: userServiceMock },
        { provide: ActivatedRoute, useValue: activatedRouteMock },
        { provide: RECAPTCHA_V3_SITE_KEY, useValue: environment.recaptcha.siteKey },
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('AuthComponent, ngOnInit()', () => {
    beforeEach(() => {
      component.ngOnInit();
    });

    it('should tracked query params', () => {
      let props = {login: true};
      activatedRouteMock.queryParams.next(props);
      expect(component.popupLogin).toBeTrue();
    })
  })

  it('should close popup auth on click', fakeAsync(() => {
    spyOn(component, 'closePopUp').and.callThrough();
    let authPopup = fixture.debugElement.query(By.css('.popup__zone'));

    component.close.pipe().subscribe((attr) => {
      expect(attr).toBeUndefined()
    })

    tick();
    authPopup.triggerEventHandler('mousedown', {
      target: {
        classList: {
          contains: (alias: string) => alias === 'popup__zone',
        }
      }});
    expect(component.closePopUp).toHaveBeenCalled();
  }))

  it('should switch popup to registration, switchMode()', () => {
    let mode = 'registration';
    let turnMonde = spyOn(component, 'switchMode').and.callThrough();

    component.switchMode(mode);
    expect(turnMonde).toHaveBeenCalled();
    expect(component.popupLogin).toEqual(mode);
  })

  it('should be open file loader, clickAvatar()', () => {
    let clickAvatar = spyOn(component, 'clickAvatar').and.callThrough();
    component.switchMode('registration');
    fixture.detectChanges();

    let btnAvatar = fixture.debugElement.query(By.css('#clickAvatar'));
    let fileAvatar = fixture.debugElement.query(By.css('#fileAvatar'));

    btnAvatar.triggerEventHandler('click', fileAvatar)
    expect(clickAvatar).toHaveBeenCalled();
  })

  describe('everything to bind FormGroup', () => {
    let profile = {
      id: 'userID',
      name: 'userName',
      email: 'userEmail',
      password: 'userPassword',
      avatar: '',
      recipe: [] as DtoRecipe[],
      isActive: true,
      created_at: new Date(),
    }

    beforeEach(() => {
      component.name?.setValue(profile.name);
      component.email?.setValue(profile.email);
      component.password?.setValue(profile.password);

      component.emailLogin?.setValue(profile.email);
      component.passwordLogin?.setValue(profile.password);
    });

    it('should be success create profile user, onSubmit()', () => {
      component.popupLogin = 'registration';
      spyOn(component, 'onSubmit').and.callThrough();
      fixture.detectChanges();

      userServiceMock.createUser.and.callFake(() => { component.profileReset() });
      let profileReset = spyOn(component,'profileReset').and.callThrough();
      let formRegis = fixture.debugElement.query(By.css('#registration'));

      formRegis.triggerEventHandler('submit');

      expect(component.onSubmit).toHaveBeenCalled();
      expect(userServiceMock.createUser).toHaveBeenCalled();
      expect(profileReset).toHaveBeenCalled();
      expect(component.name?.value).toBeNull();
      expect(component.email?.value).toBeNull();
      expect(component.password?.value).toBeNull();
    });

    it('should be success create profile user, onLogin()', () => {
      userServiceMock.loginUser.and.callFake(() => { component.loginReset() });
      let login = spyOn(component,'onLogin').and.callThrough();
      let profileReset = spyOn(component,'loginReset').and.callThrough();
      let formLogin = fixture.debugElement.query(By.css('#login'));

      fixture.detectChanges();
      formLogin.triggerEventHandler('submit',{preventDefault: () => {}});

      expect(login).toHaveBeenCalled();
      expect(userServiceMock.loginUser).toHaveBeenCalled();
      expect(profileReset).toHaveBeenCalled();
      expect(component.emailLogin?.value).toBeNull();
      expect(component.passwordLogin?.value).toBeNull();
    })

    it('should reset profileForm FormGroup, profileReset()', () => {
      let reset = spyOn(component, 'profileReset').and.callThrough();
      component.profileReset();

      expect(reset).toHaveBeenCalled();
      expect(component.name?.value).toBeNull()
    })

    it('should reset profileForm FormGroup, loginReset()', () => {
      let reset = spyOn(component, 'loginReset').and.callThrough();
      component.loginReset();

      expect(reset).toHaveBeenCalled();
      expect(component.emailLogin?.value).toBeNull()
    })

    it('should getter name, name()', () => {
      spyOnProperty(component, 'name', 'get').and.returnValue(component.profileForm.get('name'));
      expect(component.name?.value).toEqual(profile.name);
    })

    it('should getter email, email()', () => {
      spyOnProperty(component, 'email', 'get').and.returnValue(component.profileForm.get('email'));
      expect(component.email?.value).toEqual(profile.email);
    })

    it('should getter password, password()', () => {
      spyOnProperty(component, 'password', 'get').and.returnValue(component.profileForm.get('password'));
      expect(component.password?.value).toEqual(profile.password);
    })

    it('should getter emailLogin, emailLogin()', () => {
      spyOnProperty(component, 'emailLogin').and.returnValue(component.profileLogin.get('email'));
      expect(component.emailLogin?.value).toEqual(profile.email);
    })

    it('should getter passwordLogin, passwordLogin()', () => {
      spyOnProperty(component, 'passwordLogin').and.returnValue(component.profileLogin.get('password'))
      expect(component.passwordLogin?.value).toEqual(profile.password);
    })

  })

});
