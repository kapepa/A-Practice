import * as request from 'supertest';
import {UserService} from "../src/user/user.service";
import {Test} from "@nestjs/testing";
import {UserModule} from "../src/user/user.module";
import {INestApplication, NotFoundException} from "@nestjs/common";
import {Recipe} from "../src/recipe/recipe.entity";
import {AppModule} from "../src/app.module";

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
    created_at: new Date(),
  };

  let userService = {
    createUser: () => {},
    findOne: () => (profile),
    updateUser: () => {},
    deleteUser: () => {},
  };

  let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4ZGE2MDBiLTU5NmQtNGU2NS05NmVjLWZjNjgzMWY2NDRkNyIsIm5hbWUiOiJNeU5hbWUiLCJpYXQiOjE2NjI1NzIwNzAsImV4cCI6MTY2NTE2NDA3MH0.8kJfUsN3vJ5pYaemXW3LX6j_m88qGKqgDPV7THNtwuw'

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(UserService)
      .useValue(userService)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  describe('/ get user profile', () => {
    it('should be success receive profile', () => {
      return request(app.getHttpServer())
        .get('/api/user')
        .set({'Authorization': `Bearer ${token}`})
        .expect(200)
        .expect((res: Response) => {
          expect(res.body['id']).toEqual(profile.id);
        })
    });

    it('should be return not found, no set bearer token', () => {
      return request(app.getHttpServer())
        .get('/api/user')
        .set({'Authorization': `Bearer `})
        .expect(401)
        .expect((res: Response) => {
          expect(res.body).toEqual( { statusCode: 401, message: 'Unauthorized' });
        })
    });
  });

  describe('/create create user profile', () => {
    it('should be success create new profile', () => {
      jest.spyOn(userService,'createUser').mockImplementation(() => true);

      return request(app.getHttpServer())
        .post('/api/user/create')
        .send({ name: profile.name, email: profile.email, password: profile.password })
        .expect(201)
        .expect((res: Response) => {
          expect(res.body).toEqual({ create: true });
        })
    });

    it('should be error validation', () => {
      jest.spyOn(userService,'createUser').mockImplementation(() => false);

      return request(app.getHttpServer())
        .post('/api/user/create')
        .send({ name: '', email: '', password: '' })
        .expect(400)
        .expect((res: Response) => {
          expect(res.body).toEqual({
            statusCode: 400,
            message: [
              'name must be longer than or equal to 3 characters',
              'email must be an email',
              'password should not be empty'
            ],
            error: 'Bad Request'
            }
          );
        })
    })
  });

  describe('/update update profile user',() => {
    let newName = 'NewName'
    let currentChange = { id: profile.id, name: newName }
    it('should be success update profile user', () => {
      jest.spyOn(userService, 'updateUser').mockImplementation(() => ({...profile, name: newName}));

      return request(app.getHttpServer())
        .patch('/api/user/update')
        .set({'Authorization': `Bearer ${token}`})
        .send(currentChange)
        .expect(200)
        .expect((res: Response) => {
          expect(res.body['name']).toEqual(newName)
        })
    })

    it('should be not found, no have token', () => {
      jest.spyOn(userService, 'updateUser').mockImplementation(() => ({...profile, name: newName}));

      return request(app.getHttpServer())
        .patch('/api/user/update')
        .set({'Authorization': `Bearer`})
        .send(currentChange)
        .expect(401)
        .expect((res: Response) => {
          expect(res.body).toEqual({ statusCode: 401, message: 'Unauthorized' })
        })
    })
  });

  describe('/delete/:id delete profile on id', () => {

    it('should be success delete profile', () => {
      jest.spyOn(userService, 'deleteUser').mockImplementation(() => (true))

      return request(app.getHttpServer())
        .delete('/api/user/delete/:id')
        .set({'Authorization': `Bearer ${token}`})
        .send('profileID')
        .expect(200)
    })

    it('should be not found, no have token', () => {
      jest.spyOn(userService, 'deleteUser').mockImplementation(() => (true))

      return request(app.getHttpServer())
        .delete('/api/user/delete/:id')
        .set({'Authorization': `Bearer`})
        .send('profileID')
        .expect(401)
        .expect((res: Response) => {
          expect(res.body).toEqual({ statusCode: 401, message: 'Unauthorized' })
        })
    })
  })
})