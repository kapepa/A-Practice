import {ConflictException, Injectable} from '@nestjs/common';
import { DtoIngredient, RecipeDto } from "../dto/recipe.dto";
import { UserDto } from "../dto/user.dto";
import { Ingredients, Recipe } from "./recipe.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { FileService } from "../file/file.service";
import { UserService } from "../user/user.service";

@Injectable()
export class RecipeService {
  constructor(
    @InjectRepository(Recipe)
    private recipeRepository: Repository<Recipe>,
    @InjectRepository(Ingredients)
    private ingredientsRepository: Repository<Ingredients>,
    private fileService: FileService,
    private userService: UserService,
  ) {}

  async createRecipe(recipe: RecipeDto, imageFile: Express.Multer.File, userHash: UserDto) {
    const image = !!imageFile ? await this.fileService.writeFile(imageFile) : '';
    const user = await this.userService.findOne('id', userHash.id);
    const recipeDo = this.recipeRepository.create({...recipe, image, user})
    const ingredients = await this.createIngredients(recipe.ingredients, recipeDo)

    await this.recipeRepository.save({...recipeDo, ingredients});
  }

  async createIngredients(ingredients: DtoIngredient[], recipe: any ) {
    const listIngredients = ingredients.reduce((accum: DtoIngredient[], ingredient: DtoIngredient) => {
      accum.push(this.ingredientsRepository.create({ ...ingredient, recipe }));
      return accum;
    }, [] as DtoIngredient[]);

    return await this.ingredientsRepository.save(listIngredients);
  }

  async updateRecipe( recipe: RecipeDto, user: UserDto ): Promise<RecipeDto> {
    const currentRecipe = await this.findOne('id', recipe.id, { relations: ['user'] } )
    if (currentRecipe.user.id !== user.id) throw new ConflictException();

    return await this.recipeRepository.save({...currentRecipe, ...recipe})
  }

  async updateIngredient( recipe: RecipeDto, user: UserDto ): Promise<DtoIngredient> {
    const currentRecipe = await this.findOne('id', recipe.id, { relations: ['user'] } )
    if (currentRecipe.user.id !== user.id) throw new ConflictException();

    return await this.ingredientsRepository.save({...currentRecipe, ...recipe})
  }

  async allRecipe(query: { take?: number, skip?: number, where?: string }): Promise<RecipeDto[]> {
    const options = { take: query.take ? Number(query.take) : 5, skip: query.skip ? Number(query.skip) : 0, };
    const where = !!query.where ? { where: { name: query.where } } : {}
    return await this.recipeRepository.find({ ...where, ...options as {}, relations: ['ingredients'] });
  }

  async allIngredient(query:  { take?: number, skip?: number, where?: string }): Promise<DtoIngredient[]> {
    const options = { take: query.take ? Number(query.take) : 5, skip: query.skip ? Number(query.skip) : 0, };
    const where = !!query.where ? { where: { name: query.where } } : {}
    return await this.ingredientsRepository.find({ ...where, ...options as {} });
  }

  async findOne(key: string, val: string, options?: { relations?: string[], select?: string[] }): Promise<RecipeDto> {
    return this.recipeRepository.findOne({ where: { [key]: val }, ...options as {} });
  }
}
