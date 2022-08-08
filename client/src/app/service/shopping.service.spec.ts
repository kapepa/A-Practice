import { TestBed, inject } from '@angular/core/testing';

import { ShoppingService } from './shopping.service';
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { RouterTestingModule } from "@angular/router/testing";

describe('ShoppingService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ],
      providers: [
        ShoppingService,
      ],
    });
  });

  it('should get users', inject([HttpTestingController, ShoppingService],
      (httpMock: HttpTestingController, shoppingService: ShoppingService) => {
        expect(shoppingService).toBeTruthy();
      }
    )
  );
});
