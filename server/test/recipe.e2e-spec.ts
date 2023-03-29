import * as request from 'supertest';
import {INestApplication, NotFoundException, NotImplementedException} from "@nestjs/common";
import {Test} from "@nestjs/testing";
import {RecipeService} from "../src/recipe/recipe.service";
import {AppModule} from "../src/app.module";
import {DtoIngredient, RecipeDto} from "../src/dto/recipe.dto";
import {UserDto} from "../src/dto/user.dto";
import {JwtService} from "@nestjs/jwt";
import * as dotenv from 'dotenv'

describe('RecipeController (e2e)', () => {
  let app: INestApplication;


  let ingredient = {
    id: 'ingredientID',
    name: 'ingredientName',
    amount: 2,
    public: true,
    recipe: [] as RecipeDto[],
    created_at: Date.now(),
  }

  let recipe = {
    id: 'recipeID',
    name: 'recipeName',
    description: 'recipeDesc',
    image: '',
    user: {id: 'userID'} as UserDto,
    ingredients: [] as DtoIngredient[],
    created_at: Date.now(),
  }

  let token = new JwtService({secret: process.env.JWT_TOKEN}).sign({ id: 'userID', name: 'userName' })

  let recipeServiceMock = {
    createRecipe: jest.fn(() => {}),
    findOne: jest.fn(() => {}),
    allRecipe: jest.fn(() => {}),
    updateRecipe: jest.fn(() => {}),
    deleteRecipe: jest.fn(() => {}),
    allIngredient: jest.fn(() => {}),
    createIngredient: jest.fn(() => {}),
    updateIngredient: jest.fn(() => {}),
    deleteIngredient: jest.fn(() => {}),
  }

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(RecipeService)
      .useValue(recipeServiceMock)
      .compile();

    jest.resetAllMocks()
    app = moduleRef.createNestApplication();
    await app.init();
  });

  describe('/api/recipe/create post create recipe, createRecipe()', () => {
    let createBody = {name: recipe.name, description: recipe.description}

    // it('should be success create recipe', () => {
    //   jest.spyOn(recipeServiceMock, 'createRecipe').mockImplementation(() => (recipe));
    //
    //   return request(app.getHttpServer())
    //     .post('/api/recipe/create')
    //     .set({'Authorization': `Bearer ${token}`})
    //     .send(createBody)
    //     .expect(201)
    //     .expect((res: Response) => {
    //       expect(res.body).toEqual(recipe);
    //     })
    // })

    it('should be return user not user token', () => {
      return request(app.getHttpServer())
        .post('/api/recipe/create')
        .set({'Authorization': `Bearer`})
        .send(createBody)
        .expect(401)
        .expect((res: Response) => {
          expect(res.body).toEqual( { statusCode: 401, message: 'Unauthorized' })
        })
    })

    it('should be NotImplementedException', () => {
      jest.spyOn(recipeServiceMock, 'createRecipe').mockImplementation(async () => {throw new NotFoundException()});

      return request(app.getHttpServer())
        .post('/api/recipe/create')
        .set({'Authorization': `Bearer ${token}`})
        .expect(201)
        .expect((res: Response) => {
          expect(res.body['response']).toEqual({ statusCode: 501, message: 'Not Implemented' })
        })
    })
  })

  // describe('/api/one/:id get edit recipe on id, getEditRecipe()', () => {
  //   it('should return recipe on id', () => {
  //     jest.spyOn(recipeServiceMock, 'findOne').mockImplementation(() => (recipe));
  //
  //     return request(app.getHttpServer())
  //       .get(`/api/recipe/one/${recipe.id}`)
  //       .expect(200)
  //       .expect((res: Response) => {
  //         expect(res.body).toEqual(recipe)
  //       })
  //   })
  //
  //   it('should be NotFoundException', () => {
  //     jest.spyOn(recipeServiceMock, 'findOne').mockImplementation(async () => {throw new NotFoundException()});
  //
  //     return request(app.getHttpServer())
  //       .get(`/api/recipe/one/${recipe.id}`)
  //       .expect(200)
  //       .expect((res: Response) => {
  //         expect(res.body['response']).toEqual({ statusCode: 404, message: 'Not Found' })
  //       })
  //   })
  // })
  //
  // describe('/api/edit/:id get edit recipe on id, getEditRecipe()', () => {
  //   it('should return recipe on id', () => {
  //     jest.spyOn(recipeServiceMock, 'findOne').mockImplementation(() => (recipe));
  //
  //     return request(app.getHttpServer())
  //       .get(`/api/recipe/edit/${recipe.id}`)
  //       .set({'Authorization': `Bearer ${token}`})
  //       .send({ statusCode: 409, message: 'Conflict' })
  //       .expect(200)
  //       // .expect((res: Response) => {
  //       //   expect(res.body['response']).toEqual({ statusCode: 409, message: 'Conflict' })
  //       // })
  //   })
  //
  //   it('should be return user not user token', () => {
  //     return request(app.getHttpServer())
  //       .get(`/api/recipe/edit/${recipe.id}`)
  //       .set({'Authorization': `Bearer`})
  //       .expect(401)
  //       .expect((res: Response) => {
  //         expect(res.body).toEqual( { statusCode: 401, message: 'Unauthorized' })
  //       })
  //   })
  //
  //   it('should be NotFoundException', () => {
  //     jest.spyOn(recipeServiceMock, 'findOne').mockImplementation(async () => {throw new NotFoundException()});
  //
  //     return request(app.getHttpServer())
  //       .get(`/api/recipe/edit/${recipe.id}`)
  //       .set({'Authorization': `Bearer ${token}`})
  //       .expect(200)
  //       .expect((res: Response) => {
  //         expect(res.body['response']).toEqual({ statusCode: 404, message: 'Not Found' })
  //       })
  //   })
  // })
  //
  // describe('/api/recipe, get receive list recipe on query param, getRecipe()', () => {
  //   it('should be return array recipe on query params', () => {
  //     jest.spyOn(recipeServiceMock, 'allRecipe').mockImplementation(() => ([recipe]));
  //
  //     return request(app.getHttpServer())
  //       .get(`/api/recipe?take=5&skip=0`)
  //       .expect(200)
  //       .expect((res: Response) => {
  //         expect(res.body).toEqual([recipe]);
  //       })
  //   })
  //
  //   it('should be NotFoundException', () => {
  //     jest.spyOn(recipeServiceMock, 'allRecipe').mockImplementation(async () => {throw new NotFoundException()});
  //
  //     return request(app.getHttpServer())
  //       .get(`/api/recipe?take=5&skip=0`)
  //       .expect(404)
  //       .expect((res: Response) => {
  //         expect(res.body).toEqual({ statusCode: 404, message: 'Not Found' })
  //       })
  //   })
  // })
  //
  // describe('/api/recipe/update patch, update recipe, updateRecipe()', () => {
  //   let updateRecipe = { name: 'New Name', id: recipe.id};
  //
  //   it('should be success update recipe', () => {
  //     jest.spyOn(recipeServiceMock, 'updateRecipe').mockImplementation(() => ({...recipe, ...updateRecipe}));
  //
  //     return request(app.getHttpServer())
  //       .patch('/api/recipe/update')
  //       .set({'Authorization': `Bearer ${token}`})
  //       .send(updateRecipe)
  //       .expect(200)
  //       .expect((res: Response) => {
  //         expect(res.body).toEqual({...recipe, ...updateRecipe})
  //       })
  //   })
  //
  //   it('should be return user not user token Unauthorized', () => {
  //     return request(app.getHttpServer())
  //       .patch('/api/recipe/update')
  //       .set({'Authorization': `Bearer`})
  //       .expect(401)
  //       .expect((res: Response) => {
  //         expect(res.body).toEqual( { statusCode: 401, message: 'Unauthorized' })
  //       })
  //   })
  //
  //   it('should be NotFoundException', () => {
  //     jest.spyOn(recipeServiceMock, 'updateRecipe').mockImplementation(async () => {throw new NotFoundException()});
  //
  //     return request(app.getHttpServer())
  //       .patch('/api/recipe/update')
  //       .set({'Authorization': `Bearer ${token}`})
  //       .expect(404)
  //       .expect((res: Response) => {
  //         expect(res.body).toEqual({ statusCode: 404, message: 'Not Found' })
  //       })
  //   })
  // })
  //
  // describe('/api/recipe/:id delete, delete recipe on id, deleteRecipe()', () => {
  //   it('should delete recipe success on id', () => {
  //     jest.spyOn(recipeServiceMock, 'deleteRecipe').mockImplementation(() => ({delete: true}));
  //
  //     return request(app.getHttpServer())
  //       .delete(`/api/recipe/${recipe.id}`)
  //       .set({'Authorization': `Bearer ${token}`})
  //       .expect(200)
  //       .expect((res: Response) => {
  //         expect(res.body).toEqual({delete: { delete: true }});
  //       })
  //   })
  //
  //   it('should be return user not user token Unauthorized', () => {
  //     return request(app.getHttpServer())
  //       .delete(`/api/recipe/${recipe.id}`)
  //       .set({'Authorization': `Bearer`})
  //       .expect(401)
  //       .expect((res: Response) => {
  //         expect(res.body).toEqual( { statusCode: 401, message: 'Unauthorized' })
  //       })
  //   })
  //
  //   it('should be NotFoundException', () => {
  //     jest.spyOn(recipeServiceMock, 'deleteRecipe').mockImplementation(async () => {throw new NotFoundException()});
  //
  //     return request(app.getHttpServer())
  //       .delete(`/api/recipe/${recipe.id}`)
  //       .set({'Authorization': `Bearer ${token}`})
  //       .expect(200)
  //       .expect((res: Response) => {
  //         expect(res.body['response']).toEqual({ statusCode: 404, message: 'Not Found' })
  //       })
  //   })
  // })
  //
  // describe('/api/recipe/ingredients get, receive ingredients on query parma, getAllIngredients()', () => {
  //   it('should be return ingredients which select on query params', () => {
  //     jest.spyOn(recipeServiceMock, 'allIngredient').mockImplementation(() => ([ingredient]))
  //
  //     return request(app.getHttpServer())
  //       .get('/api/recipe/ingredients?take=5&skip=0')
  //       .expect(200)
  //       .expect((res: Response) => {
  //         expect(res.body).toEqual([ingredient])
  //       })
  //   })
  //
  //   it('should be NotFoundException', () => {
  //     jest.spyOn(recipeServiceMock, 'allIngredient').mockImplementation(async () => {throw new NotFoundException()});
  //
  //     return request(app.getHttpServer())
  //       .get('/api/recipe/ingredients?take=5&skip=0')
  //       .set({'Authorization': `Bearer ${token}`})
  //       .expect(404)
  //       .expect((res: Response) => {
  //         expect(res.body).toEqual({ statusCode: 404, message: 'Not Found' })
  //       })
  //   })
  // })
  //
  // describe('/api/recipe/ingredient/create post, create ingredient, createIngredient()', () => {
  //   it('should be success create ingredient', () => {
  //     jest.spyOn(recipeServiceMock, 'createIngredient').mockImplementation(() => (ingredient));
  //
  //     return request(app.getHttpServer())
  //       .post('/api/recipe/ingredient/create')
  //       .set({'Authorization': `Bearer ${token}`})
  //       .send({name: ingredient.name, amount: 2})
  //       .expect(201)
  //       .expect((res: Response) => {
  //         expect(res.body).toEqual(ingredient)
  //       })
  //   })
  //
  //   it('should be return user not user token Unauthorized', () => {
  //     return request(app.getHttpServer())
  //       .post('/api/recipe/ingredient/create')
  //       .set({'Authorization': `Bearer`})
  //       .expect(401)
  //       .expect((res: Response) => {
  //         expect(res.body).toEqual( { statusCode: 401, message: 'Unauthorized' })
  //       })
  //   })
  //
  //   it('should be NotFoundException', () => {
  //     jest.spyOn(recipeServiceMock, 'createIngredient').mockImplementation(async () => {throw new NotFoundException()});
  //
  //     return request(app.getHttpServer())
  //       .post('/api/recipe/ingredient/create')
  //       .set({'Authorization': `Bearer ${token}`})
  //       .send({name: ingredient.name, amount: 2})
  //       .expect(201)
  //       .expect((res: Response) => {
  //         expect(res.body['response']).toEqual({ statusCode: 404, message: 'Not Found' })
  //       })
  //   })
  // })
  //
  // describe('/api/recipe/ingredient/update patch, update ingredients, updateIngredients()', () => {
  //   let newIngredient = {name: 'New Name', id: ingredient.id};
  //   it('should be success update ingredient', () => {
  //     jest.spyOn(recipeServiceMock, 'updateIngredient').mockImplementation(() => ({...ingredient, ...newIngredient}));
  //
  //     return request(app.getHttpServer())
  //       .patch('/api/recipe/ingredient/update')
  //       .set({'Authorization': `Bearer ${token}`})
  //       .send(newIngredient)
  //       .expect(200)
  //       .expect((res: Response) => {
  //         expect(res.body).toEqual({...ingredient, ...newIngredient})
  //       })
  //   })
  //
  //   it('should be return user not user token Unauthorized', () => {
  //     return request(app.getHttpServer())
  //       .patch('/api/recipe/ingredient/update')
  //       .set({'Authorization': `Bearer`})
  //       .expect(401)
  //       .expect((res: Response) => {
  //         expect(res.body).toEqual( { statusCode: 401, message: 'Unauthorized' })
  //       })
  //   })
  //
  //   it('should be NotFoundException', () => {
  //     jest.spyOn(recipeServiceMock, 'updateIngredient').mockImplementation(async () => {throw new NotFoundException()});
  //
  //     return request(app.getHttpServer())
  //       .patch('/api/recipe/ingredient/update')
  //       .set({'Authorization': `Bearer ${token}`})
  //       .send(newIngredient)
  //       .expect(404)
  //       .expect((res: Response) => {
  //         expect(res.body).toEqual({ statusCode: 404, message: 'Not Found' })
  //       })
  //   })
  // })
  //
  // describe('/api/recipe/ingredient/:id delete, delete ingredient, deleteIngredient()', () => {
  //   it('should be success delete ingredient on params id', () => {
  //     jest.spyOn(recipeServiceMock, 'deleteIngredient').mockImplementation(() => ({ delete: true }));
  //
  //     return request(app.getHttpServer())
  //       .delete(`/api/recipe/ingredient/${ingredient.id}`)
  //       .set({'Authorization': `Bearer ${token}`})
  //       .expect(200)
  //       .expect((res: Response) => {
  //         expect(res.body).toEqual({ delete: { delete: true } })
  //       })
  //   })
  //
  //   it('should be return user not user token Unauthorized', () => {
  //     return request(app.getHttpServer())
  //       .delete(`/api/recipe/ingredient/${ingredient.id}`)
  //       .set({'Authorization': `Bearer`})
  //       .expect(401)
  //       .expect((res: Response) => {
  //         expect(res.body).toEqual( { statusCode: 401, message: 'Unauthorized' })
  //       })
  //   })
  //
  //   it('should be NotFoundException', () => {
  //     jest.spyOn(recipeServiceMock, 'deleteIngredient').mockImplementation(async () => {throw new NotFoundException()});
  //
  //     return request(app.getHttpServer())
  //       .delete(`/api/recipe/ingredient/${ingredient.id}`)
  //       .set({'Authorization': `Bearer ${token}`})
  //       .expect(200)
  //       .expect((res: Response) => {
  //         expect(res.body['response']).toEqual({ message: "Not Found", statusCode: 404 })
  //       })
  //   })
  // })
});
