import { TestBed } from '@angular/core/testing';

import { AccessEditGuard } from './access-edit.guard';

describe('AccessEditGuard', () => {
  let guard: AccessEditGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AccessEditGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
