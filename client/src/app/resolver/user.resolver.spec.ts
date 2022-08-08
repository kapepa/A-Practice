import { TestBed } from '@angular/core/testing';

import { UserResolver } from './user.resolver';
import { RouterTestingModule } from "@angular/router/testing";

describe('UserResolver', () => {
  beforeEach((() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [UserResolver],
    }).compileComponents();
  }));

  it('should be created', () => {
    expect([UserResolver]).toBeTruthy();
  });
});
