import {
  Body,
  Controller, Delete,
  Get,
  NotFoundException,
  NotImplementedException, Param, Patch,
  Post, Query,
  Req, UploadedFile,
  UseGuards,
  UseInterceptors
} from '@nestjs/common';
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import {DtoIngredient, RecipeDto} from "../dto/recipe.dto";
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

  @Get('/:id')
  @ApiResponse({ status: 200, description: 'Get one Recipe', type: RecipeDto })
  @ApiResponse({ status: 404, description: 'Not found'})
  async getOneRecipe(@Param() param): Promise<RecipeDto | NotFoundException> {
    try {
      return this.recipeService.findOne('id', param.id, { relations: ['ingredients'] });
    } catch (e) {
      return !!e ? e : new NotFoundException();
    }
  }

  @Get('')
  @ApiResponse({ status: 200, description: 'Get all Recipe', type: RecipeDto })
  @ApiResponse({ status: 404, description: 'Not found'})
  async getRecipe(@Query() query): Promise<RecipeDto[] | NotFoundException> {
    try {
      return this.recipeService.allRecipe(query);
    } catch (e) {
      return !!e ? e : new NotFoundException();
    }
  }

  @Get('/ingredients')
  @ApiResponse({ status: 200, description: 'Recipe created successfully', type: RecipeDto })
  @ApiResponse({ status: 404, description: 'Not found'})
  async getAllIngredients(@Query() query): Promise<DtoIngredient[] | NotFoundException> {
    try {
      return this.recipeService.allIngredient({...query, take: Number(query.take), skip: Number(query.skip)});
    } catch (e) {
      return !!e ? e : new NotFoundException();
    }
  }

  @Patch('/ingredients/update')
  @UseGuards(JwtAuthGuard)
  @ApiResponse({ status: 201, description: 'Recipe update successfully', type: RecipeDto })
  @ApiResponse({ status: 501, description: 'Not Implemented'})
  async updateIngredients(@Body() body, @Req() req): Promise<DtoIngredient>{
    try {
      return this.recipeService.updateIngredient(body, req.user);
    } catch (e) {
      return !!e ? e : new NotFoundException();
    }
  }

  @Patch('/update')
  @UseGuards(JwtAuthGuard)
  @ApiResponse({ status: 201, description: 'Recipe update successfully', type: RecipeDto })
  @ApiResponse({ status: 501, description: 'Not Implemented'})
  async updateRecipe(@Body() body, @Req() req): Promise<RecipeDto>{
    try {
      return this.recipeService.updateRecipe(body, req.user);
    } catch (e) {
      return !!e ? e : new NotFoundException();
    }
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiResponse({ status: 200, description: 'Recipe delete successfully', type: RecipeDto })
  @ApiResponse({ status: 501, description: 'Not Implemented'})
  async deleteRecipe(@Param() param, @Req() req) {
    try {
      return await this.recipeService.deleteRecipe(param.id, req.user.id);
    } catch (e) {
      return !!e ? e : new NotFoundException();
    }
  }

  @Delete('/ingredient/:id')
  @UseGuards(JwtAuthGuard)
  @ApiResponse({ status: 200, description: 'Recipe delete successfully', type: RecipeDto })
  @ApiResponse({ status: 501, description: 'Not Implemented'})
  async deleteIngredient(@Param() param, @Req() req) {
    try {
      return await this.recipeService.deleteRecipe(param.id, req.user.id);
    } catch (e) {
      return !!e ? e : new NotFoundException();
    }
  }
}
