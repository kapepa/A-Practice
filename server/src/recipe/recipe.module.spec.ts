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
    user: {} as UserDto,
    ingredients: [] as DtoIngredient[],
    created_at: new Date(),
  } as RecipeDto

  let recipeArr = [recipe] as RecipeDto[];
  let ingredientArr = [ingredient] as DtoIngredient[];
  let userArr = [profile] as UserDto[];

  let mockRepositoryRecipe = {
    save: jest.fn().mockImplementation((data) => {
      recipeArr.push(data)
      return Promise.resolve(data);
    }),
    create: jest.fn().mockImplementation((recipe: Recipe) => {
      return {
        id: Date.now().toString(),
        name: recipe.name,
        description: recipe.description,
        image: recipe.image,
        user: recipe.user as UserDto,
        ingredients: recipe.ingredients,
        created_at: new Date(),
      } as RecipeDto;
    })
  }

  let mockRepositoryIngredients = {
    save: jest.fn().mockImplementation((data) => Promise.resolve(data)),
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
    // jest.resetAllMocks();
  })

  it('should be defined UserService', () => {
    expect(recipeService).toBeDefined();
  })

  it('should be success create new recipe', async () => {
    let recipe = await recipeService.createRecipe({ name: 'New Recipe', description: 'some desc', image: '', ingredients: [] }, undefined, profile)
    expect(recipeArr.length).toEqual(2)
  })

})