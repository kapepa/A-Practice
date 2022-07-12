import { Injectable } from '@nestjs/common';
import { RecipeDto } from "../dto/recipe.dto";
import { UserDto } from "../dto/user.dto";
import { Ingredients, Recipe } from "./recipe.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { FileService } from "../file/file.service";
import {UserService} from "../user/user.service";

@Injectable()
export class RecipeService {
  constructor(
    @InjectRepository(Recipe)
    private recipeRepository: Repository<Recipe>,
    @InjectRepository(Ingredients)
    private IngredientsRepository: Repository<Ingredients>,
    private fileService: FileService,
    private userService: UserService,
  ) {}

  async createRecipe(recipe: RecipeDto, image: Express.Multer.File, userHash: UserDto) {
    // const avatarUrl = !!image ? await this.fileService.writeFile(image) : '';
    // const user = this.userService.findOne('id', userHash.id);
    console.log(recipe.ingredients);
  }
}
