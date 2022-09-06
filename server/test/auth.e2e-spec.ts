import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AuthController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe('Login user /api/auth/login POST', () => {
    let url = '/api/auth/login';

    it('should be success login user', () => {
      return request(app.getHttpServer())
        .post(url)
        .send({ email: 'myemail@gamil.com', password: '123456' })
        .expect(201)
    });

    it('should be wrong entered data user', function () {
      return request(app.getHttpServer())
        .post(url)
        .send({ email: '', password: '' })
        .expect(401)
    });
  })

})