import {TestBed} from "@angular/core/testing";
import {HeaderComponent} from "./header.component";
import {RouterTestingModule} from "@angular/router/testing";
import {UserService} from "../../service/user.service";
import {ErrorService} from "../../service/error.service";
import {SpinnerService} from "../../service/spinner.service";

describe('HeaderComponent', () => {
  let headerComponent: HeaderComponent;
  let userService: jasmine.SpyObj<UserService>;
  let errorService: jasmine.SpyObj<ErrorService>;
  let spinnerService: jasmine.SpyObj<SpinnerService>;

  let userServiceSpy = jasmine.createSpyObj('UserService', ['']);
  let errorServiceSpy = jasmine.createSpyObj('ErrorService', ['']);
  let spinnerServiceSpy = jasmine.createSpyObj('SpinnerService', ['']);

  beforeEach((() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
      ],
      providers: [
        HeaderComponent,
        { provide: UserService, useValue: userServiceSpy },
        { provide: ErrorService, useValue: errorServiceSpy },
        { provide: SpinnerService, useValue: spinnerServiceSpy },
      ]
    })

    headerComponent = TestBed.inject(HeaderComponent);
    userService = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
    errorService = TestBed.inject(ErrorService) as jasmine.SpyObj<ErrorService>;
    spinnerService = TestBed.inject(SpinnerService) as jasmine.SpyObj<SpinnerService>;
  }))

  it('should be create HeaderComponent', () => {
    expect(headerComponent).toBeTruthy();
  })


})
