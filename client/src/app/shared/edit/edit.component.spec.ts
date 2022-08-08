import { TestBed } from '@angular/core/testing';

import { EditComponent } from './edit.component';
import { RouterTestingModule } from "@angular/router/testing";

describe('EditComponent', () => {
  beforeEach((() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [EditComponent],
    }).compileComponents();
  }));

  it('should create', () => {
    expect([EditComponent]).toBeTruthy();
  });
});
