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

describe('AuthComponent', () => {
  let component: AuthComponent;
  let fixture: ComponentFixture<AuthComponent>;

  let userServiceMock = jasmine.createSpyObj('UserService',
    ['createUser'],
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

  it('should be success create profile user, onSubmit()', () => {

  })

});
