import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from "./auth.service";
import {UnauthorizedException} from "@nestjs/common";
import {Recipe} from "../recipe/recipe.entity";

describe('AuthController', () => {
  let controller: AuthController;
  let authService: AuthService;
  let unauthorized = new UnauthorizedException();

  let authServiceMock = {
    login: jest.fn(async ({id, name, email}) => {
      console.log('login', name, email);
      return (!!name && !!email) ? Promise.resolve({ access_token: 'some_token' }) : Promise.reject( new UnauthorizedException());
    }),
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
    let reqMock = { user: { id: 'userID', name: 'MyName', email: 'MyEmail', password: 'MyPassword' } } as unknown as Request;

    it('should be return access_token', async () => {
      try {
        let login = await controller.loginUser(reqMock);
        expect(login).toEqual({ access_token: 'some_token' });
      } catch (err) {
        expect(err).toBeInstanceOf(unauthorized)
      }
    })

    it('should be return UnauthorizedException', async () => {
      jest.spyOn(controller, 'loginUser').mockRejectedValue(new UnauthorizedException());
      try {
        await controller.loginUser(reqMock);
      } catch (err) {
        expect(err).toBeInstanceOf(UnauthorizedException);
      }
    })
  })
});
