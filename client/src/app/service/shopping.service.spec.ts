import { TestBed } from '@angular/core/testing';

import { ShoppingService } from './shopping.service';
import { RouterTestingModule } from "@angular/router/testing";
import { HttpService } from "./http.service";
import { of } from "rxjs";
import {DtoIngredient} from "../dto/dto.recipe";
import {DtoErrorResponse} from "../dto/dto.common";

describe('ShoppingService', () => {
  let shoppingService: ShoppingService;
  let httpService: jasmine.SpyObj<HttpService>;

  let httpServiceSpy = jasmine.createSpyObj('HttpService', [
    'getAllIngredient', 'createIngredient', 'updateIngredient', 'deleteIngredient',
  ]);

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      providers: [
        ShoppingService,
        { provide: HttpService, useValue: httpServiceSpy }
      ],
    });
    shoppingService = TestBed.inject(ShoppingService);
    httpService = TestBed.inject(HttpService) as jasmine.SpyObj<HttpService>;
  });

  it('get all ingredient', () => {
    httpService.getAllIngredient.and.returnValue(of( {} as DtoIngredient[] & DtoErrorResponse));
    shoppingService.getAllIngredient();

    expect([] as DtoIngredient[]).toEqual([] as DtoIngredient[]);
  });

  it('get ingredient request', () => {
    httpService.getAllIngredient.and.returnValue(of( {} as DtoIngredient[] & DtoErrorResponse));
    shoppingService.getIngredientRequest();

    expect([] as DtoIngredient[]).toEqual([] as DtoIngredient[]);
  })

  it('get ingredient page', () => {
    httpService.getAllIngredient.and.returnValue(of( {} as DtoIngredient[] & DtoErrorResponse));
    shoppingService.getIngredientPage();

    expect([] as DtoIngredient[]).toEqual([] as DtoIngredient[]);
  })

  it("create ingredient", () => {
    httpService.createIngredient.and.returnValue(of( {} as DtoIngredient & DtoErrorResponse));
    shoppingService.createIngredient({} as FormData, () => {});

    expect(shoppingService.ingredientList as DtoIngredient[]).toEqual([] as DtoIngredient[]);
  })

  it('update ingredient', () => {
    httpService.updateIngredient.and.returnValue(of({} as DtoIngredient & DtoErrorResponse));
    shoppingService.updateIngredient({} as FormData, () => {});

    expect(shoppingService.ingredientList).toEqual([] as DtoIngredient[])
  })

  it('delete ingredient', () => {
    httpService.deleteIngredient.and.returnValue(of({} as { delete: boolean } & DtoErrorResponse));
    shoppingService.editIndex$ = 0;
    shoppingService.ingredientList = [ {id: 'id'} as DtoIngredient ];
    shoppingService.deleteIngredient(() => {});

    expect(shoppingService.editIndex$).toEqual(0);
  })

  it('append ingredient', () => {
    shoppingService.append({} as DtoIngredient);

    expect(shoppingService.ingredientList.length).toEqual(1)
  })

  it('select edit', () => {
    shoppingService.selectEdit(0);

    expect(shoppingService.editIndex$).toEqual(0);
  })

});
