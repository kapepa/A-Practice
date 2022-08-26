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
import {HeaderModule} from "./header.module";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {DtoUser} from "../../dto/dto.user";
import {AuthComponent} from "../../popup/auth/auth.component";
import {CommonModule} from "@angular/common";
import {ReCaptchaV3Service} from "ng-recaptcha";
import {ErrorComponent} from "../../popup/error/error.component";
import {SpinnerComponent} from "../spinner/spinner.component";
import {NO_ERRORS_SCHEMA} from "@angular/core";

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
  user: DtoUser = {} as DtoUser;
}

class MockSpinnerComponent {

}

class MockErrorComponent {
  isError: any;
}

describe('HeaderComponent', () => {
  let fixture:ComponentFixture<HeaderComponent>;

  let headerComponent: HeaderComponent;
  let activatedRoute: ActivatedRoute;
  let userService: jasmine.SpyObj<UserService>;
  let errorService: jasmine.SpyObj<ErrorService>;
  let spinnerService: jasmine.SpyObj<SpinnerService>;

  let spinnerComponent: jasmine.SpyObj<SpinnerComponent>;
  let errorComponent: jasmine.SpyObj<ErrorComponent>;

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
        // { provide: SpinnerComponent, useClass: MockSpinnerComponent },
        // { provide: ErrorComponent, useClass: MockErrorComponent },
        { provide: UserService, useClass: MockUserService },
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
    headerComponent = TestBed.inject(HeaderComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    userService = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
    errorService = TestBed.inject(ErrorService) as jasmine.SpyObj<ErrorService>;
    spinnerService = TestBed.inject(SpinnerService) as jasmine.SpyObj<SpinnerService>;

    // spinnerComponent = TestBed.inject(SpinnerComponent) as jasmine.SpyObj<SpinnerComponent>;
    // errorComponent = TestBed.inject(ErrorComponent) as jasmine.SpyObj<ErrorComponent>;

    fixture.detectChanges();
  }))

  it('should be create HeaderComponent', () => {
    expect(headerComponent).toBeTruthy();
  })

  describe('HeaderComponent, ngOnInit()',() => {

    beforeEach(() => {
      headerComponent.ngOnInit();
    })

    it('should call error', () => {
      let fixtureError = TestBed.createComponent(ErrorComponent);


      console.log('!!!',fixture.debugElement.query(By.directive(ErrorDirective)))



      // headerComponent.appError.viewContainerRef.createComponent(ErrorComponent)

      // errorService.isErrorSubject.subscribe((err: DtoErrorPopup) => {
      //
      // })
    })

    // it('should have login query', () => {
    //
    //   // let auth: AuthDirective = fixture.componentInstance.appAuth;
    //
    //   // headerComponent.appAuth.viewContainerRef.createComponent(AuthComponent)
    //   // headerComponent.appAuth =
    //   //   fixture.debugElement.query(By.directive(AuthComponent)).componentInstance
    //
    //   let auth = TestBed.inject(AuthComponent)
    //
    //   activatedRoute.queryParams.subscribe((value) => {
    //     // let invokeAuth = spyOn(headerComponent, 'invokeAuth').and.callThrough();
    //     // headerComponent.appAuth = fixture.componentInstance.appAuth
    //     // console.log(fixture.componentInstance.appAuth)
    //     // headerComponent.invokeAuth();
    //     // expect(invokeAuth).toHaveBeenCalled();
    //
    //   })
    //   headerComponent.invokeAuth()
    // });

    it('should call spinner', () => {



      // spinnerService.spinner.subscribe((bool: boolean) => {
      //
      // })
    })


  })


})
