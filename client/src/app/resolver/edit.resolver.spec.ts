import { TestBed } from '@angular/core/testing';

import { EditResolver } from './edit.resolver';
import { RouterTestingModule } from "@angular/router/testing";


describe('EditResolver', () => {
  beforeEach((() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [EditResolver],
    }).compileComponents();
  }));

  it('should be created', () => {
    expect([EditResolver]).toBeTruthy();
  });
});
