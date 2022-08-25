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
import {BrowserModule} from "@angular/platform-browser";
import {HeaderModule} from "./header.module";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {DtoUser} from "../../dto/dto.user";
import {AuthComponent} from "../../popup/auth/auth.component";
import {CommonModule} from "@angular/common";

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

describe('HeaderComponent', () => {
  let fixture:ComponentFixture<HeaderComponent>;

  let headerComponent: HeaderComponent;
  let activatedRoute: ActivatedRoute;
  let userService: jasmine.SpyObj<UserService>;
  let errorService: jasmine.SpyObj<ErrorService>;
  let spinnerService: jasmine.SpyObj<SpinnerService>;

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
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
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
      headerComponent.ngOnInit();
    })

    it('should have login query', () => {

      activatedRoute.queryParams.subscribe((value) => {
        // let invokeAuth = spyOn(headerComponent, 'invokeAuth').and.callThrough();
        // headerComponent.appAuth = fixture.componentInstance.appAuth
        // console.log(fixture.componentInstance.appAuth)
        // headerComponent.invokeAuth();
        // expect(invokeAuth).toHaveBeenCalled();
      })

      // headerComponent.invokeAuth();
    });

    it('should call spinner', () => {
      // spinnerService.spinner.subscribe((bool: boolean) => {
      //
      // })
    })

    it('should call error', () => {
      // errorService.isErrorSubject.subscribe((err: DtoErrorPopup) => {
      //
      // })
    })
  })


})
