import { TestBed } from '@angular/core/testing';

import { ErrorComponent } from './error.component';

describe('ErrorComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ErrorComponent ]
    }).compileComponents();
  });

  it('should create', () => {
    expect([ ErrorComponent ]).toBeTruthy();
  });
});
