import * as request from 'supertest';
import {UserService} from "../src/user/user.service";
import {Test} from "@nestjs/testing";
import {HttpException, HttpStatus, INestApplication} from "@nestjs/common";
import {Recipe} from "../src/recipe/recipe.entity";
import {AppModule} from "../src/app.module";
import {JwtService} from "@nestjs/jwt";
import * as dotenv from 'dotenv'

dotenv.config();

describe('UserController (e2e)', () => {
  let app: INestApplication;

  let profile = {
    id: 'userID',
    name: 'userName',
    email: 'user@email.com',
    password: 'userPassword',
    avatar: '',
    recipe: [] as Recipe[],
    isActive: true,
    created_at: `${new Date(Date.now())}`,
  };

  let userService = {
    createUser: jest.fn(),
    findOne: jest.fn(),
    updateUser: jest.fn(),
    deleteUser: jest.fn(),
  };

  let token = new JwtService({secret: process.env.JWT_TOKEN}).sign({ id: profile.id, name: profile.name })

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        AppModule,
      ],
    })
      .overrideProvider(UserService)
      .useValue(userService)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  afterAll(() => {
    app.close();
  })

  describe('/ get user profile', () => {
    it('should be success receive profile', () => {
      let mockUser = profile;
      jest.spyOn(userService, 'findOne').mockImplementation(() => mockUser)

      return request(app.getHttpServer())
        .get('/api/user/one')
        .set({'Authorization': `Bearer ${token}`})
        .expect(200)
        .expect((res: Response) => {
          expect(res.body).toEqual(mockUser);
        })
    });

    it('should be return not found, no set bearer token', () => {
      jest.spyOn(userService, 'findOne').mockRejectedValue(new HttpException('Forbidden', HttpStatus.FORBIDDEN));

      return request(app.getHttpServer())
        .get('/api/user/one')
        .set({'Authorization': `Bearer ${token}`})
        .expect(HttpStatus.FORBIDDEN)
    });
  });

  // describe('/create create user profile', () => {
  //   it('should be success create new profile', () => {
  //     jest.spyOn(userService,'createUser').mockImplementation(() => true);
  //
  //     return request(app.getHttpServer())
  //       .post('/api/user/create')
  //       .send({ name: profile.name, email: profile.email, password: profile.password })
  //       .expect(201)
  //       .expect((res: Response) => {
  //         expect(res.body).toEqual({ create: true });
  //       })
  //   });
  //
  //   it('should be error validation', () => {
  //     jest.spyOn(userService,'createUser').mockImplementation(() => false);
  //
  //     return request(app.getHttpServer())
  //       .post('/api/user/create')
  //       .send({ name: '', email: '', password: '' })
  //       .expect(400)
  //       .expect((res: Response) => {
  //         expect(res.body).toEqual({
  //           statusCode: 400,
  //           message: [
  //             'name must be longer than or equal to 3 characters',
  //             'email must be an email',
  //             'password should not be empty'
  //           ],
  //           error: 'Bad Request'
  //           }
  //         );
  //       })
  //   })
  // });
  //
  // describe('/update update profile user',() => {
  //   let newName = 'NewName'
  //   let currentChange = { id: profile.id, name: newName }
  //   it('should be success update profile user', () => {
  //     jest.spyOn(userService, 'updateUser').mockImplementation(() => ({...profile, name: newName}));
  //
  //     return request(app.getHttpServer())
  //       .patch('/api/user/update')
  //       .set({'Authorization': `Bearer ${token}`})
  //       .send(currentChange)
  //       .expect(200)
  //       .expect((res: Response) => {
  //         expect(res.body['name']).toEqual(newName)
  //       })
  //   })
  //
  //   it('should be not found, no have token', () => {
  //     jest.spyOn(userService, 'updateUser').mockImplementation(() => ({...profile, name: newName}));
  //
  //     return request(app.getHttpServer())
  //       .patch('/api/user/update')
  //       .set({'Authorization': `Bearer`})
  //       .send(currentChange)
  //       .expect(401)
  //       .expect((res: Response) => {
  //         expect(res.body).toEqual({ statusCode: 401, message: 'Unauthorized' })
  //       })
  //   })
  // });
  //
  // describe('/delete/:id delete profile on id', () => {
  //   it('should be success delete profile', () => {
  //     jest.spyOn(userService, 'deleteUser').mockImplementation(() => (true))
  //
  //     return request(app.getHttpServer())
  //       .delete(`/api/user/delete/${profile.id}`)
  //       .set({'Authorization': `Bearer ${token}`})
  //       .send('profileID')
  //       .expect(200)
  //   })
  //
  //   it('should be not found, no have token', () => {
  //     jest.spyOn(userService, 'deleteUser').mockImplementation(() => (true))
  //
  //     return request(app.getHttpServer())
  //       .delete('/api/user/delete/:id')
  //       .set({'Authorization': `Bearer`})
  //       .send('profileID')
  //       .expect(401)
  //       .expect((res: Response) => {
  //         expect(res.body).toEqual({ statusCode: 401, message: 'Unauthorized' })
  //       })
  //   })
  // })
})