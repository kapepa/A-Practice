import {Test} from "@nestjs/testing";
import {RecipeService} from "./recipe.service";
import {RecipeController} from "./recipe.controller";
import {UserDto} from "../dto/user.dto";
import {DtoIngredient, RecipeDto} from "../dto/recipe.dto";
import {NotAcceptableException, NotFoundException, NotImplementedException} from "@nestjs/common";

describe('RecipeController', () => {
  let recipeController: RecipeController;
  let recipeService: RecipeService;

  let notAcceptableException = new NotAcceptableException();
  let notImplementedException = new NotImplementedException();
  let notFoundException = new NotFoundException();

  let req = {user: { id: 'userID' }} as unknown as Request;
  let res = {} as Response;

  let ingredient = {
    id: 'ingredientID',
    name: 'ingredientName',
    amount: 2,
    public: true,
    recipe: [] as RecipeDto[],
    created_at: new Date(),
  }

  let recipe = {
    id: 'recipeID',
    name: 'recipeName',
    description: 'recipeDesc',
    image: '',
    user: {} as UserDto,
    ingredients: [] as DtoIngredient[],
    created_at: new Date(),
  }

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

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [
        RecipeController
      ],
      providers: [
        { provide: RecipeService, useValue: recipeServiceMock },
      ]
    }).compile();

    recipeController = moduleRef.get<RecipeController>(RecipeController);
    recipeService = moduleRef.get<RecipeService>(RecipeService);

    jest.resetAllMocks();
  })

  it('should be recipeController', () => {
    expect(recipeController).toBeDefined();
  })

  describe('/api/recipe/create post, create recipe', () => {
    let body = {
      name: 'recipeName',
      description: 'recipeDesc',
      image: '',
      user: {} as UserDto,
      ingredients: [] as DtoIngredient[],
    }

    it('should be success create recipe', async () => {
      jest.spyOn(recipeServiceMock, 'createRecipe').mockImplementation(() => (recipe));

      try {
        let create = await recipeController.createRecipe(body, {} as Express.Multer.File, req);

        expect(create).toEqual(recipe);
        expect(recipeServiceMock.createRecipe).toHaveBeenCalled();
      } catch (err) {
        expect(err).not.toMatch('error');
      }
    });

    it('should be error when create user', async () => {
      jest.spyOn(recipeController, 'createRecipe').mockRejectedValue(notImplementedException);

      try {
        await recipeController.createRecipe(body, {} as Express.Multer.File, req);
      } catch (err) {
        expect(err['response']).toEqual({ statusCode: 501, message: 'Not Implemented' });
      }
    });
  })

  describe('/api/recipe/one/:id get, getOneRecipe()', () => {
    it('should get one recipe on id', async () => {
      jest.spyOn(recipeServiceMock, 'findOne').mockImplementation(() => (recipe));

      let getOne = await recipeController.getOneRecipe({id: 'recipeID'});

      expect(getOne).toEqual(recipe);
    })

    it('should be error because such recipe not found', async () => {
      jest.spyOn(recipeController, 'getOneRecipe').mockRejectedValue(notFoundException);

      try {
        await recipeController.getOneRecipe({id: 'recipeID'});
      } catch (err) {
        expect(err['response']).toEqual({ statusCode: 404, message: 'Not Found' });
      }
    })
  })

  describe('/api/recipe/edit/:id get, getEditRecipe()', () => {
    it('should be get one recipe on id which current user may edit', async () => {
      let data = { ...recipe, user: {id: 'userID' } }
      jest.spyOn(recipeServiceMock, 'findOne').mockImplementation(() => (data));

      let editRecipe = await recipeController.getEditRecipe({id: 'recipeID'}, req);

      expect(editRecipe).toEqual(data);
      expect(recipeService.findOne).toHaveBeenCalled();
    })

    it('should be return error because this used do not edit recipe', async () => {
      let data = { ...recipe, user: {id: 'otherID' } };
      jest.spyOn(recipeServiceMock, 'findOne').mockImplementation(() => (data));

      let editRecipe = await recipeController.getEditRecipe({id: 'recipeID'}, req);

      expect(editRecipe['response']).toEqual({ statusCode: 409, message: 'Conflict' })
    })

    it('should be return error not found recipe', async () => {
      jest.spyOn(recipeController, 'getEditRecipe').mockRejectedValue(notFoundException);

      try {
        await recipeController.getEditRecipe({id: 'recipeID'}, req);
      } catch (err) {
        expect(err['response']).toEqual({ statusCode: 404, message: 'Not Found' });
      }
    })
  })

  describe('/api/recipe get recipe array on query params', () => {
    let query = {take: 5, skip: 0};
    it('should be get RecipeDto[]', async () => {
      jest.spyOn(recipeServiceMock, 'allRecipe').mockImplementation(() => ([recipe]));
      let all = await recipeController.getRecipe(query);

      expect(all).toEqual([recipe]);
      expect(recipeServiceMock.allRecipe).toHaveBeenCalled();
    })

    it('should be return error such query isn\'t exist', async () => {
      jest.spyOn(recipeController, 'getRecipe').mockRejectedValue(notFoundException);

      try {
        await recipeController.getRecipe(query);
      } catch (err) {
        expect(err['response']).toEqual({ statusCode: 404, message: 'Not Found' });
      }
    })
  })

  describe('/api/recipe/update patch, update already exist recipe', () => {
    let name = 'New Name';
    let data = {...recipe, name}
    it('should be success update recipe', async () => {
      jest.spyOn(recipeServiceMock, 'updateRecipe').mockImplementation(() => (data));
      let update = await recipeController.updateRecipe({...recipe, name}, {} as Express.Multer.File, req);

      expect(update).toEqual(data);
      expect(recipeServiceMock.updateRecipe).toHaveBeenCalled();
    })

    it('should be return error such recipe no found', async () => {
      jest.spyOn(recipeController, 'updateRecipe').mockRejectedValue(notFoundException);

      try {
        await recipeController.updateRecipe(data, {} as Express.Multer.File, req);
      } catch (err) {
        expect(err['response']).toEqual({ statusCode: 404, message: 'Not Found' });
      }
    })
  })

  describe('/api/recipe/:id, delete recipe on id, deleteRecipe()', () => {
    it('should be success delete recipe', async () => {
      jest.spyOn(recipeServiceMock, 'deleteRecipe').mockImplementation(() => (true) );
      let del = await recipeController.deleteRecipe({id: 'recipeID'}, req);

      expect(del).toEqual({delete: true});
      expect(recipeServiceMock.deleteRecipe).toHaveBeenCalled();
    })

    it('should be return error recipe is not found', async () => {
      jest.spyOn(recipeController, 'deleteRecipe').mockRejectedValue(notFoundException);

      try {
        await recipeController.deleteRecipe({id: 'recipeID'}, req);
      } catch ( err ) {
        expect(err['response']).toEqual({ statusCode: 404, message: 'Not Found' });
      }
    })
  })

  describe('/api/recipe/ingredients get, getAllIngredients()', () => {
    let query = {take: 5, skip: 0};

    it('should be select to have ingredient on db, on property value in query', async () => {
      jest.spyOn(recipeServiceMock, 'allIngredient').mockImplementation(() => ([ingredient]));
      let all = await recipeController.getAllIngredients(query);

      expect(all).toEqual([ingredient]);
      expect(recipeServiceMock.allIngredient).toHaveBeenCalled();
    })

    it('should be return error on query value is not correct', async () => {
      jest.spyOn(recipeController, 'getAllIngredients').mockRejectedValue(notFoundException);

      try {
        await recipeController.getAllIngredients(query);
      } catch (err) {
        expect(err['response']).toEqual({ statusCode: 404, message: 'Not Found' });
      }
    })
  })

  describe('/api/recipe/ingredient/create post, create ingredient, createIngredient()', () => {
    let newIngredient = { name: ingredient.name, amount: ingredient.amount };

    it('should be success create new ingredient', async () => {
      jest.spyOn(recipeServiceMock, 'createIngredient').mockImplementation(() => (ingredient));
      let create = await recipeController.createIngredient(newIngredient);

      expect(create).toEqual(ingredient);
    })

    it('should be error when create ingredient', async () => {
      jest.spyOn(recipeController, 'createIngredient').mockRejectedValue(notAcceptableException);

      try {
        await recipeController.createIngredient(newIngredient);
      } catch (err) {
        expect(err['response']).toEqual({ statusCode: 406, message: 'Not Acceptable' });
      }
    })
  })

  describe('/api/recipe/ingredient/update patch, update ingredient, updateIngredients()', () => {
    let body = {...ingredient, name: 'New Name' };

    it('should be success update ingredient', async () => {
      jest.spyOn(recipeServiceMock, 'updateIngredient').mockImplementation(() => (body));
      let update = await recipeController.updateIngredients(body, req);

      expect(update).toEqual(body);
      expect(recipeServiceMock.updateIngredient).toHaveBeenCalled();
    })

    it(' should be return error such ingredient font found', async () => {
      jest.spyOn(recipeController, 'updateIngredients').mockRejectedValue(notFoundException);

      try {
        await recipeController.updateIngredients(body, req);
      } catch (err) {
        expect(err['response']).toEqual({ statusCode: 404, message: 'Not Found' });
      }
    })
  })

  describe('/api/recipe/ingredient/:id delete, delete ingredient on id, deleteIngredient()', () => {
    it('should be success delete ingredient', async () => {
      jest.spyOn(recipeServiceMock, 'deleteIngredient').mockImplementation(() => true);
      let del = await recipeController.deleteIngredient({id: 'ingredientID'}, req);

      expect(del).toEqual({ delete: true });
      expect(recipeServiceMock.deleteIngredient).toHaveBeenCalled();
    })

    it('should be error suc ingredient not found', async () => {
      jest.spyOn(recipeController, 'deleteIngredient').mockRejectedValue(notFoundException);

      try {
        await recipeController.deleteIngredient({id: 'ingredientID'}, req);
      } catch (err) {
        expect(err['response']).toEqual({ statusCode: 404, message: 'Not Found' });
      }
    });
  })
})