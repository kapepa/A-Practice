import { TestBed } from '@angular/core/testing';

import { EditResolver } from './edit.resolver';
import { HttpService } from "../service/http.service";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ActivatedRouteSnapshot } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";

describe('EditResolver', () => {
  let editResolver: EditResolver;
  let httpService: jasmine.SpyObj<HttpService>;

  let spyHttpService = jasmine.createSpyObj('HttpService', [
    'getEditRecipe',
  ])

  beforeEach((() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
      ],
      providers: [
        EditResolver,
        { provide: HttpService, useValue: spyHttpService },
      ]
    })

    editResolver = TestBed.inject(EditResolver);
    httpService = TestBed.inject(HttpService) as jasmine.SpyObj<HttpService>;
  }));

  it('should be created EditResolver',() => {
    expect(EditResolver).toBeDefined();
  })

  it('should send id recipe', () => {
    let id = '1234'
    let mock = <T, P extends keyof T>(obj: Pick<T, P>): T => obj as T;
    let route = mock<ActivatedRouteSnapshot, 'params'>({
      params: {id},
    });
    httpService.getEditRecipe.and.callThrough();

    editResolver.resolve(route)
    expect(editResolver.routerID).toEqual(id)
  })

});
