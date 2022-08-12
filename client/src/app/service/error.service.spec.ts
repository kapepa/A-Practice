import { TestBed } from '@angular/core/testing';

import { ErrorService } from './error.service';
import { DtoErrorPopup } from "../dto/dto.common";

describe('ErrorService', () => {
  let serviceError: ErrorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ErrorService
      ]
    });
    serviceError = TestBed.inject(ErrorService);
  });

  it('set error', (done: DoneFn) => {
    serviceError.isErrorSubject.subscribe((res) => {
      expect(res).toEqual({} as DtoErrorPopup);
      done();
    })

    serviceError.setError({} as DtoErrorPopup)
  });

  it('reset error', (done: DoneFn) => {
    serviceError.isErrorSubject.subscribe(res => {
      expect(res).toEqual({open: false, title: '', desc: ''})
      done()
    })

    serviceError.restError();
  })
});
