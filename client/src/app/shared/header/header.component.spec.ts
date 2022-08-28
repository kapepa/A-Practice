import {ComponentFixture, TestBed} from "@angular/core/testing";
import {HeaderComponent} from "./header.component";
import {RouterTestingModule} from "@angular/router/testing";
import {UserService} from "../../service/user.service";
import {ErrorService} from "../../service/error.service";
import {SpinnerService} from "../../service/spinner.service";
import {of} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {DtoErrorPopup} from "../../dto/dto.common";
import {AuthDirective} from "../../directive/auth.directive";
import {ErrorDirective} from "../../directive/error.directive";
import {SpinnerDirective} from "../../directive/spinner.directive";
import {AlertDirective} from "../../directive/alert.directive";
import {BrowserModule, By} from "@angular/platform-browser";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {DtoUser} from "../../dto/dto.user";
import {CommonModule} from "@angular/common";
import {RECAPTCHA_V3_SITE_KEY, ReCaptchaV3Service} from "ng-recaptcha";
import {ErrorComponent} from "../../popup/error/error.component";
import {NO_ERRORS_SCHEMA} from "@angular/core";
import {environment} from "../../../environments/environment";

class MockSpinnerService {
  spinner = of(true);
}

class MockErrorService {
  isErrorSubject = of({
    open: true,
    title: 'TitleError',
    desc: 'DescError'
  } as DtoErrorPopup);
}
class MockUserService {

  user: DtoUser = { name: '' } as DtoUser;
  logoutUser = () => {};
}

describe('HeaderComponent', () => {
  let fixture:ComponentFixture<HeaderComponent>;
  let component: HeaderComponent;

  let headerComponent: HeaderComponent;
  let activatedRoute: ActivatedRoute;
  let userService: jasmine.SpyObj<UserService>;
  let errorService: jasmine.SpyObj<ErrorService>;
  let spinnerService: jasmine.SpyObj<SpinnerService>;

  let userServiceSpy = jasmine.createSpyObj('UserService', ['logoutUser', 'user']);

  beforeEach((() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        BrowserModule,
        RouterTestingModule,
        CommonModule,
      ],
      providers: [
        HeaderComponent,
        ErrorComponent,
        ReCaptchaV3Service,
        {
          provide: RECAPTCHA_V3_SITE_KEY,
          useValue: environment.recaptcha.siteKey,
        },
        // { provide: UserService, useClass: MockUserService },
        { provide: UserService, useValue: userServiceSpy },
        { provide: ErrorService, useClass: MockErrorService },
        { provide: SpinnerService, useClass: MockSpinnerService },
        { provide: ActivatedRoute, useValue: { queryParams: of({login: 'login'}) }},
      ],
      declarations: [
        HeaderComponent,
        AuthDirective,
        ErrorDirective,
        SpinnerDirective,
        AlertDirective,
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;

    headerComponent = TestBed.inject(HeaderComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    userService = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
    errorService = TestBed.inject(ErrorService) as jasmine.SpyObj<ErrorService>;
    spinnerService = TestBed.inject(SpinnerService) as jasmine.SpyObj<SpinnerService>;

    fixture.detectChanges();
  }))

  it('should be create HeaderComponent', () => {
    expect(headerComponent).toBeTruthy();
  })

  describe('HeaderComponent, ngOnInit()',() => {

    beforeEach(() => {
      fixture.detectChanges();
      component.ngOnInit();
    })

    it('should have login query', () => {
      activatedRoute.queryParams.subscribe((value) => {
        let invokeAuth = spyOn(headerComponent, 'invokeAuth').and.callThrough();
        headerComponent.appAuth = fixture.componentInstance.appAuth

        headerComponent.invokeAuth();
        expect(invokeAuth).toHaveBeenCalled();
        expect(value).toEqual({login: 'login'});
        expect(component.login).toBeTruthy();
      })
    });

    it('should call spinner', () => {

      spinnerService.spinner.subscribe((bool: boolean) => {
        expect(bool).toBeTruthy();
      })
    })

    it('should call error', () => {
      errorService.isErrorSubject.subscribe((err: DtoErrorPopup) => {
        expect(err).toEqual({ open: true, title: 'TitleError', desc: 'DescError' });
        expect(component.error).toBeTruthy();
      })
    })
  })

  it('should all unsubscribe dynamic component', () => {
    spyOn(component,'ngOnDestroy').and.callThrough();
    component.ngOnDestroy()

    expect(component.ngOnDestroy).toHaveBeenCalled();
    expect(component.login.closed).toBeTruthy();
    expect(component.error.closed).toBeTruthy();
    expect(component.spinner.closed).toBeTruthy();
  })

  it('should click logout user, logoutUser()', () => {
    userServiceSpy.user.and.returnValue({name: 'MyName'})

    let click = fixture.debugElement.query(By.css('#logout'));
    click.triggerEventHandler('click');

    expect(userService.logoutUser).toHaveBeenCalled();
  });


  it('should get user', () => {
    let profile = { name: 'MyName' };
    spyOnProperty(component, 'user', 'get').and.returnValue(profile)

    fixture.detectChanges();
    let element = fixture.debugElement.query(By.css('#name'));

    expect(element.nativeElement.textContent).toContain(profile.name)
  })

  it('should create AuthComponent, invokeAuth()', () => {
    spyOn(component, 'invokeAuth').and.callThrough();
    component.invokeAuth();

    expect(component.invokeAuth).toHaveBeenCalled();
    activatedRoute.queryParams.subscribe((value) => {
      expect(value).toEqual({login: 'login'})
    })
  })
})
