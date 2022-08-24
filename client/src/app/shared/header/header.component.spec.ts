import {TestBed} from "@angular/core/testing";
import {HeaderComponent} from "./header.component";
import {RouterTestingModule} from "@angular/router/testing";
import {UserService} from "../../service/user.service";
import {ErrorService} from "../../service/error.service";
import {SpinnerService} from "../../service/spinner.service";
import {of} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {DtoErrorPopup} from "../../dto/dto.common";

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

describe('HeaderComponent', () => {
  let headerComponent: HeaderComponent;
  let activatedRoute: ActivatedRoute;
  let userService: jasmine.SpyObj<UserService>;
  let errorService: jasmine.SpyObj<ErrorService>;
  let spinnerService: jasmine.SpyObj<SpinnerService>;

  let userServiceSpy = jasmine.createSpyObj('UserService', ['']);

  beforeEach((() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
      ],
      providers: [
        HeaderComponent,
        { provide: UserService, useValue: userServiceSpy },
        { provide: ErrorService, useClass: MockErrorService },
        { provide: SpinnerService, useClass: MockSpinnerService },
        { provide: ActivatedRoute, useValue: { queryParams: of({login: 'login'}) }},
      ]
    })

    headerComponent = TestBed.inject(HeaderComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    userService = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
    errorService = TestBed.inject(ErrorService) as jasmine.SpyObj<ErrorService>;
    spinnerService = TestBed.inject(SpinnerService) as jasmine.SpyObj<SpinnerService>;

  }))

  it('should be create HeaderComponent', () => {
    expect(headerComponent).toBeTruthy();
  })

  describe('HeaderComponent, ngOnInit()',() => {

    it('should have login query', () => {
      activatedRoute.queryParams.subscribe((value) => {
        // let invoke = spyOn(headerComponent, 'invokeAuth').and.callThrough();
        // expect(invoke).toHaveBeenCalled();
      })

      spinnerService.spinner.subscribe((bool: boolean) => {

      })

      errorService.isErrorSubject.subscribe((err: DtoErrorPopup) => {

      })

      headerComponent.ngOnInit()
    });
  })


})
