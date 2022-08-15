import { TestBed } from '@angular/core/testing';

import { SpinnerService } from './spinner.service';

describe('SpinnerService', () => {
  let spinnerService: SpinnerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SpinnerService,
      ]
    }).compileComponents();

    spinnerService = TestBed.inject(SpinnerService);
  });

  it('should create httpService', () => {
    expect(spinnerService).toBeTruthy();
  });

  it('change state', () => {
    spinnerService.changeState();

    expect(spinnerService.spinner$).toEqual(true)
  })
});
