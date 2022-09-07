import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import {getRepositoryToken} from "@nestjs/typeorm";
import {UserService} from "../user/user.service";
import {JwtModule} from "@nestjs/jwt";
import {UserDto} from "../dto/user.dto";

describe('AuthService', () => {
  let loginPassword = '123456';
  let loginEmail = 'myemail@gamil.com';
  let hashPassword = '$2b$10$9gZLYELCDLOeLcy2vXGTIuvll/ofuX5d1rF0vDdljDUEEe16F4AUm'

  let service: AuthService;

  let userServiceMock = {
    findOne: jest.fn((attr) => attr),
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        JwtModule.register({
          secret: process.env.JWT_TOKEN,
          signOptions: { expiresIn: '30d' },
        }),
      ],
      providers: [
        AuthService,
        {
          provide: UserService, useValue: userServiceMock,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be return hash string, bcryptHash()', async () => {
    let hash = await service.bcryptHash('someHash');
    expect(hash).toBeDefined();
  })

  it('should be return true when compare hash and password', async () => {
    let compared = await service.bcryptCompare(loginPassword, hashPassword);
    expect(compared).toBeTruthy()
  })

  describe('validate user login and compered password and hash, validateUser()', () => {
    it('should be success login',async () => {
      jest.spyOn(userServiceMock, 'findOne').mockImplementation(() => ({ email: loginEmail, password: hashPassword }));
      let login = await service.validateUser(loginEmail, loginPassword);

      expect(userServiceMock.findOne).toHaveBeenCalled();
      expect(login).toEqual({ email: loginEmail});
    })

    it('should be error when find or compered password', async () => {
      jest.spyOn(userServiceMock, 'findOne').mockImplementation( () => ({ email: 'error@gamil.com', password: '111111' }));
      let login = await service.validateUser(loginEmail, loginPassword);

      expect(userServiceMock.findOne).toHaveBeenCalled();
      expect(login).toBeNull();
    })
  })

  it('should be return Bearer token', async () => {
    let user = { id: 'userID', name: 'userName' } as UserDto;
    let login = await service.login(user);

    expect(login.access_token).toBeDefined();
  })

});
