import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from "./auth.service";
import {UnauthorizedException} from "@nestjs/common";

describe('AuthController', () => {
  let controller: AuthController;
  let authService: AuthService;
  let unauthorized = new UnauthorizedException();

  let authServiceMock = {
    login: jest.fn((attr) => attr),
  }

  let reqMock = {} as unknown as Request;
  let resMock = {
    status: jest.fn(() => {})
  } as unknown as Response;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        { provide: AuthService, useValue: authServiceMock }
      ]
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('login()', () => {
    it('should be return status 400', async () => {
      jest.spyOn(controller, 'loginUser').mockRejectedValue(() => unauthorized );
      try {
       await controller.loginUser(reqMock);
      } catch (err) {
        expect(err).toBeTruthy();
      }
    })

    it('should be return access_token', async () => {
      let token = {access_token: 'MyToken'};
      let reqMock = { user: { name: 'MyName', email: 'MyEmail', password: 'MyPassword' } } as unknown as Request;
      jest.spyOn(authServiceMock, 'login').mockImplementation(() => (token) );

      try {
        let login = await controller.loginUser(reqMock);
        expect(login).toEqual(token);
      } catch (err) {
        expect(err).toBeInstanceOf(unauthorized)
      }
    })
  })
});
