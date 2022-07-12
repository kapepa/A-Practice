import {
  Body,
  Controller,
  Get,
  NotFoundException,
  NotImplementedException,
  Post,
  Req, UploadedFile,
  UseGuards,
  UseInterceptors
} from '@nestjs/common';
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { RecipeDto } from "../dto/recipe.dto";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import {RecipeService} from "./recipe.service";
import {FileInterceptor} from "@nestjs/platform-express";

@ApiTags('recipe')
@Controller('/api/recipe')
export class RecipeController {
  constructor(
    private recipeService: RecipeService
  ) {}

  @Post('/create')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('image'))
  @ApiResponse({ status: 201, description: 'Recipe created successfully', type: RecipeDto })
  @ApiResponse({ status: 501, description: 'Not Implemented'})
  async createRecipe(@Body() body, @UploadedFile() image: Express.Multer.File, @Req() req): Promise<RecipeDto |  NotImplementedException> {
    try {
      await this.recipeService.createRecipe(JSON.parse(JSON.stringify(body)), image, req.user);
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
