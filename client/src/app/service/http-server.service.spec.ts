import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { HttpService } from "./http.service";
import { RouterTestingModule } from "@angular/router/testing";

describe('Http Server', () => {
  let service: HttpService;
  let backend: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        HttpService,
        HttpClient,
        HttpHandler,
      ],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
      ]
    });

    service = TestBed.inject(HttpService);
    backend = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    backend.verify();
  });

  it('When the getShift method is invoked', async () => {
    // service.getPosts().subscribe();
    // backend.expectOne({
    //   url: 'https://jsonplaceholder.typicode.com/posts',
    //   method: 'GET'
    // });
  })

  // describe('When the getShift method is invoked', () => {
  //   it('should make a GET request to the services/shift endpoint', async() => {
  //     //
  //     // backend.expectOne({
  //     //   url: 'https://jsonplaceholder.typicode.com/posts',
  //     //   method: 'GET'
  //     // });
  //   });
  // });

});
