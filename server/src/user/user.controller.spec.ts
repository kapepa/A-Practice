import { Test } from "@nestjs/testing";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { UserDto } from "../dto/user.dto";
import {ConflictException, NotFoundException, UnauthorizedException} from "@nestjs/common";
import {throws} from "assert";
import {Column, CreateDateColumn, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Recipe} from "../recipe/recipe.entity";


describe('UserController', () => {
  let userController: UserController;
  let userService: UserService;
  let unauthorized = new UnauthorizedException();
  let conflictException = new ConflictException();
  let notFoundException = new NotFoundException();

  let userServiceMock = {
    createUser: jest.fn((attr) => attr),
    findOne: jest.fn((attr) => attr),
    updateUser: jest.fn((attr) => attr),
    deleteUser: jest.fn((attr) => attr),
  }

  let reqMock = {} as unknown as Request;
  let resMock = {} as unknown as Response;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        { provide: UserService, useValue: userServiceMock },
      ],
    }).compile();

    userController = moduleRef.get<UserController>(UserController);
    userService = moduleRef.get<UserService>(UserService);
  })

  it('should create userController', () => {
    expect(userController).toBeDefined();
  });

  describe('post /create, createUser()', () => {
    let body = { name: 'userName', email: 'userEmail@email.ru', password: 'userPassword' } as UserDto;

    it('should be already create user', async () => {
      jest.spyOn(userService, 'createUser').mockRejectedValue(conflictException);
      let user = await userController.createUser( {} as Express.Multer.File, body );

      expect(user['response']).toEqual({ statusCode: 409, message: 'Conflict' });
    })

    it('should success create new user', async () => {
      jest.spyOn(userService, 'createUser').mockImplementation(async () => (true));

      try {
        let user = await userController.createUser( {} as Express.Multer.File, body );
        expect(user).toEqual({ create: true });
      } catch (err) {
        expect(err).toBeInstanceOf(unauthorized)
      }
    })
  })

  describe('get /, getUser()', () => {
    let profile = {
      id: 'userID',
      name: 'userName',
      email: 'user@email.com',
      password: 'userPassword',
      avatar: '',
      recipe: [] as Recipe[],
      isActive: true,
      created_at: new Date(),
    }

    it('should be return profile user on id', async () => {
      jest.spyOn(userService, 'findOne').mockImplementation(async () => (profile));
      try {
        let req = { user: profile } as unknown as Request;
        let user = await userController.getUser(req);
        expect(userService.findOne).toHaveBeenCalled();
        expect(user).toEqual(profile);
      } catch (err) {
        expect(err).toBeInstanceOf(notFoundException);
      }
    })

    it('should be return profile not fond', async () => {
      jest.spyOn(userService, 'findOne').mockRejectedValue(notFoundException);
      let req = { user: profile } as unknown as Request;
      let user = await userController.getUser(req);

      expect(user['response']).toEqual({ statusCode: 404, message: 'Not Found' })
    })
  })

})