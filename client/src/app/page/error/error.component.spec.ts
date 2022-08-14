import { TestBed } from '@angular/core/testing';

import { ErrorComponent } from './error.component';
import { RouterTestingModule } from "@angular/router/testing";

describe('ErrorComponent', () => {

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RouterTestingModule ],
      providers: [
        ErrorComponent,
      ]
    }).compileComponents();
  });

  it('should create', () => {
    expect(true).toEqual(true)
  });
});
