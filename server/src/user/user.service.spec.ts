import {Test} from "@nestjs/testing";
import {UserService} from "./user.service";
import {FileService} from "../file/file.service";
import {AuthService} from "../auth/auth.service";
import {MailerService} from "../mailer/mailer.service";
import {getRepositoryToken} from "@nestjs/typeorm";
import {User} from "./user.entity";
import {Recipe} from "../recipe/recipe.entity";
import {UserDto} from "../dto/user.dto";
import {ConflictException} from "@nestjs/common";

describe('UserService', () => {
  let userService: UserService;

  let fileServiceMock = {
    writeFile: jest.fn(() => {}),
  }

  let authServiceMock = {
    bcryptHash: jest.fn(() => {}),
  }

  let mailerServiceMock = {
    registrationMail: jest.fn(() => {}),
  }

  let mockRepository = {
    findOne: jest.fn(() => {}),
    update: jest.fn(() => {}),
    delete: jest.fn(() => {}),
    create: jest.fn(() => {}),
    save: jest.fn(() => {}),
  };

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

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        UserService,
        { provide: FileService, useValue: fileServiceMock },
        { provide: AuthService, useValue: authServiceMock },
        { provide: MailerService, useValue: mailerServiceMock },
        { provide: getRepositoryToken(User), useValue: mockRepository },
      ]
    }).compile();

    userService = moduleRef.get<UserService>(UserService);

    jest.resetAllMocks();
  })

  it('should get userService', () => {
    expect(userService).toBeDefined();
  })

  it('should be return user profile on id', async () => {
    jest.spyOn(mockRepository, 'findOne').mockImplementation(() => (profile));
    let find = await userService.findOne('id', profile.id);

    expect(mockRepository.findOne).toHaveBeenCalled();
    expect(find).toEqual(profile);
  })

  describe('create new profile, createUser()', () => {
    let data = { name: 'userName', email: 'userEmail@email.ru', password: 'userPassword' } as UserDto;

    it('should be success create new profile', async () => {
      jest.spyOn(mockRepository, 'save').mockImplementation(() => ({ save: true }));
      jest.spyOn(authServiceMock, 'bcryptHash').mockImplementation(() => 'bcryptHashPassword');

      let create = await userService.createUser(data, undefined);

      expect(create).toBeTruthy();
      expect(mockRepository.findOne).toHaveBeenCalled();
      expect(fileServiceMock.writeFile).not.toHaveBeenCalled();
      expect(mockRepository.create).toHaveBeenCalled();
      expect(mockRepository.save).toHaveBeenCalled();
    })

    it('should be return error what such email already exist!', async () => {
      jest.spyOn(mockRepository, 'findOne').mockImplementation(() => (profile));
      try {
        await userService.createUser(data, undefined);
      } catch (err) {
        expect(err['response']).toEqual({ statusCode: 409, message: 'Conflict' });
      }
    })

  })

  it('should be update profile and return profile after update', async () => {
    let newProfile = {...profile, name: 'NewName'};
    jest.spyOn(mockRepository, 'findOne').mockImplementation(() => (newProfile));

    let update = await userService.updateUser(newProfile);

    expect(update).toEqual(newProfile);
    expect(mockRepository.update).toHaveBeenCalled();
  })


  describe('delete profile, deleteUser()', () => {
    it('should be delete profile, and return boolean true', async () => {
      jest.spyOn(mockRepository, 'delete').mockImplementation(() => ({delete: true}));

      let del = await userService.deleteUser('userID');

      expect(del).toBeTruthy();
      expect(mockRepository.delete).toHaveBeenCalled();
    })

    it('should be not found such profile', async () => {
      jest.spyOn(mockRepository, 'delete').mockImplementation(() => undefined);

      let del = await userService.deleteUser('userID');

      expect(del['response']).toEqual({ statusCode: 404, message: 'Not Found' });
      expect(mockRepository.delete).toHaveBeenCalled();
    })
  })

});