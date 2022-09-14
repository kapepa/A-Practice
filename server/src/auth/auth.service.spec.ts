import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import {UserService} from "../user/user.service";
import {JwtModule} from "@nestjs/jwt";
import {UserDto} from "../dto/user.dto";
import {Recipe} from "../recipe/recipe.entity";
import {NotFoundException, UnauthorizedException} from "@nestjs/common";

describe('AuthService', () => {
  let loginPassword = '123456';

  let service: AuthService;

  let profile = {
    id: 'userID',
    name: 'userName',
    email: 'user@email.com',
    password: '$2b$10$stN.HV8TE4ouCKwNsGh/oOezhP8sy1LxI4mvCEMGlrAdBoT9bfjEO',
    avatar: '',
    recipe: [] as Recipe[],
    isActive: true,
    created_at: new Date(),
  }

  let userArr = [profile]

  let userServiceMock = {
    findOne: jest.fn(async (key, val) => {
      let find = userArr.find(profile => ( profile[key] === val ));
      return find ? Promise.resolve(find) : Promise.reject( new NotFoundException() );
    }),
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
    let compared = await service.bcryptCompare(loginPassword, profile.password);
    expect(compared).toBeTruthy();
  })

  describe('validate user login and compered password and hash, validateUser()', () => {
    it('should be success login',async () => {
      let validate = await service.validateUser(profile.email, loginPassword);
      let { password, ...other } = profile;
      expect(validate).toEqual(other);
    });

    it('should be wrong password when compered', async () => {
      let validate = await service.validateUser(profile.email, 'aaasdasd');
      expect(validate).toBeNull();
    })

    it('should be NotFoundException', async () => {
      try {
        await service.validateUser('test@mail.com', loginPassword);
      } catch (err) {
        expect(err).toBeInstanceOf(NotFoundException);
      }
    })
  })

  it('should be return Bearer token', async () => {
    let user = { id: 'userID', name: 'userName' } as UserDto;
    let login = await service.login(user);

    expect(login.access_token).toBeDefined();
  })

});
