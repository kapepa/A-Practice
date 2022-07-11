import {Controller, Get, NotFoundException, NotImplementedException, Post} from '@nestjs/common';
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { RecipeDto } from "../dto/recipe.dto";

@ApiTags('recipe')
@Controller('/api/recipe')
export class RecipeController {

  @Post('/create')
  @ApiResponse({ status: 201, description: 'Recipe created successfully', type: RecipeDto })
  @ApiResponse({ status: 501, description: 'Not Implemented'})
  async createRecipe(): Promise<RecipeDto |  NotImplementedException> {
    try {
      return {} as RecipeDto
    } catch (e) {
      return new NotImplementedException();
    }
  }

  @Get('')
  @ApiResponse({ status: 20, description: 'Recipe created successfully', type: RecipeDto })
  @ApiResponse({ status: 404, description: 'Not found'})
  async getRecipe(): Promise<RecipeDto | NotFoundException> {
    try {
      return {} as RecipeDto;
    } catch (e) {
      return new NotFoundException();
    }
  }
}
