import {UserService} from "../user/user.service";
import {Test} from "@nestjs/testing";
import {getRepositoryToken} from "@nestjs/typeorm";
import {Ingredients, Recipe} from "./recipe.entity";
import {FileService} from "../file/file.service";
import {RecipeService} from "./recipe.service";
import {DtoIngredient, RecipeDto} from "../dto/recipe.dto";
import {UserDto} from "../dto/user.dto";
import { v4 as uuid } from 'uuid';

describe('RecipeService', () => {
  let recipeService: RecipeService;

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

  let ingredient = {
    id: 'ingredientID',
    name: 'ingredientName',
    amount: 2,
    public: true,
    recipe: [] as RecipeDto[],
    created_at: new Date(),
  } as DtoIngredient

  let recipe = {
    id: 'recipeID',
    name: 'recipeName',
    description: 'recipeDesc',
    image: '',
    user: profile as UserDto,
    ingredients: [ingredient] as DtoIngredient[],
    created_at: new Date(),
  } as RecipeDto

  let recipeArr = [recipe] as RecipeDto[];
  let ingredientArr = [ingredient] as DtoIngredient[];
  let userArr = [profile] as UserDto[];

  let mockRepositoryRecipe = {
    save: jest.fn().mockImplementation((data) => {
      if (data.id.trim()){
        let recipeIndex = recipeArr.findIndex(recipe => recipe.id === data.id);
        let update = {...recipeArr[recipeIndex], ...data};
        recipeArr.splice(recipeIndex,1, update);
        return Promise.resolve(update);
      } else {
        let recipe = { id : Date.now().toString(), ...data} as RecipeDto;
        recipeArr.push(recipe)
        return Promise.resolve(recipe);
      }
    }),
    create: jest.fn().mockImplementation((recipe: Recipe) => {
      return {
        id: '',
        name: recipe.name,
        description: recipe.description,
        image: recipe.image,
        user: recipe.user as UserDto,
        ingredients: recipe.ingredients,
        created_at: new Date(),
      } as RecipeDto;
    }),
    findOne: jest.fn().mockImplementation(( arg) => {
      let { where } = arg;
      let keys = Object.keys(where)[0];
      return recipeArr.find(recipe => recipe[keys] === where[keys])
    })
  }

  let mockRepositoryIngredients = {
    save: jest.fn().mockImplementation((data) => {
      Array.isArray(data) ? ingredientArr.push(...data) : ingredientArr.push(data);
      return Promise.resolve(data);
    }),
    create: jest.fn().mockImplementation((ingredients: DtoIngredient) => {
      return {
        id: Date.now().toString(),
        name: ingredients.name,
        amount: ingredients.amount,
        public: false,
        recipe: [] as RecipeDto[],
        created_at: new Date(),
      } as DtoIngredient
    })
  }

  let mockFileService = {
    writeFile: jest.fn().mockImplementation((file:Express.Multer.File ) => {
      let fileName = uuid();
      let fileExtension = file.originalname.split('.').pop();
      return Promise.resolve(`${fileName}.${fileExtension}`);
    })
  }

  let mockUserService = {
    findOne: jest.fn().mockImplementation((key: string, val: string) => {
      return Promise.resolve(userArr.find((profile: UserDto) => profile[key] === val));
    })
  }

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        RecipeService,
        { provide: getRepositoryToken(Recipe), useValue: mockRepositoryRecipe },
        { provide: getRepositoryToken(Ingredients), useValue: mockRepositoryIngredients },
        { provide: FileService, useValue: mockFileService },
        { provide: UserService, useValue: mockUserService },
      ],
    }).compile();

    recipeService = moduleRef.get<RecipeService>(RecipeService);
  })

  it('should be defined UserService', () => {
    expect(recipeService).toBeDefined();
  })

  it('should be success create new recipe', async () => {
    let create = await recipeService.createRecipe({ name: 'New Recipe', description: 'some desc', image: '', ingredients: [] }, undefined, profile)
    expect(recipeArr.find(recipe => recipe.id === create.id)).toEqual(create);
  })

  it('should create ingredients', async () => {
    let create = await recipeService.createIngredients([{ name: 'New Ingredients', amount: 4}], recipe);
    expect(ingredientArr.find(ingredient => ingredient.id === create[0].id));
  })

  it('should be create ingredient', async () => {
    let create = await recipeService.createIngredient({ name: 'New Ingredient', amount: 4});
    expect(ingredientArr.find(ingredient => ingredient.id === create.id)).toEqual(create);
  })

  describe('updateRecipe()', () => {
    it('should be update recipe', async () => {
      let update = await recipeService.updateRecipe({id: recipe.id, name: 'Update Name'} as RecipeDto,undefined, profile);
      expect(recipeArr.find(recipe => recipe.id === update.id)).toEqual(update)
    })

    it('should be ConflictException when update', async () => {
      let update = await recipeService.updateRecipe({id: recipe.id, name: 'Update Name'} as RecipeDto,undefined, {...profile, id: '11'});
      console.log(update)
    })
  })
})