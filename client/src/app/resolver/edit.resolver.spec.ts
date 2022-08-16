import { TestBed } from '@angular/core/testing';

import { EditResolver } from './edit.resolver';
import { RouterTestingModule } from "@angular/router/testing";
import {HttpService} from "../service/http.service";


describe('EditResolver', () => {
  let httpService: HttpService;
  let editResolver: EditResolver;

  let spyHttpService = jasmine.createSpyObj('HttpService', ['getEditRecipe']);

  beforeEach((() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        EditResolver,
        { provide: HttpService, useValue: spyHttpService }
      ]
    })

    httpService = TestBed.inject(HttpService) as jasmine.SpyObj<HttpService>;
    editResolver = TestBed.inject(EditResolver);
  }));

  it('should be created EditResolver', () => {
    expect(EditResolver).toBeDefined();
  });

  it('should send id recipe',() => {

  })
});
