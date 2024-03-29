import { Test, TestingModule } from '@nestjs/testing';
import {HttpException, INestApplication, UnauthorizedException} from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import {AuthService} from "../src/auth/auth.service";
import {JwtService} from "@nestjs/jwt";
import * as dotenv from 'dotenv';

dotenv.config();

const MockAuthService = {
  login: jest.fn(),
  validateUser: jest.fn(),
}

describe('AuthController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(AuthService)
      .useValue(MockAuthService)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(() => {
    app.close();
  })

  describe('Login user /api/auth/login POST', () => {

    it('should be success login user', () => {
      let mockUser = { id: 'userID', name: 'userName' };
      let token = new JwtService({secret: process.env.JWT_TOKEN, signOptions: { expiresIn: '30d' }}).sign(mockUser);
      jest.spyOn(MockAuthService, 'validateUser').mockImplementation(() => (mockUser))
      jest.spyOn(MockAuthService, 'login').mockImplementation(() => ({ access_token: token }));

      return request(app.getHttpServer())
        .post('/api/auth/login')
        .set({ 'Accept': 'application/json' })
        .send({ email: 'myemail@gamil.com', password: '123456' })
        .expect(201)
        .expect((res: Response) => {
          expect(res.body['access_token']).toBeDefined();
        });
    });

    it('should be invalid entered data user', function () {
      jest.spyOn(MockAuthService, 'validateUser').mockImplementation(() => (new UnauthorizedException()));
      jest.spyOn(MockAuthService, 'login').mockRejectedValue(new UnauthorizedException())

      return request(app.getHttpServer())
        .post('/api/auth/login')
        .send({ email: '', password: '' })
        .expect(401)
        .expect((req: Response) => {
          expect(req.text).toEqual("{\"statusCode\":401,\"message\":\"Unauthorized\"}")
        });
    });
  });
})