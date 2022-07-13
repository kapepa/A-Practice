import { Injectable } from '@nestjs/common';
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

    console.log(await this.recipeRepository.save({...recipeDo, ingredients}))

  }

  async createIngredients(ingredients: DtoIngredient[], recipe: any ) {
    const listIngredients = ingredients.reduce((accum: DtoIngredient[], ingredient: DtoIngredient) => {
      accum.push(this.ingredientsRepository.create({ ...ingredient, recipe }));
      return accum;
    }, [] as DtoIngredient[]);

    console.log(listIngredients);
    return await this.ingredientsRepository.save(listIngredients);
  }
}
