import {
  Body, ConflictException,
  Controller, Delete,
  Get, NotAcceptableException,
  NotFoundException,
  NotImplementedException, Param, Patch,
  Post, Query,
  Req, UploadedFile,
  UseGuards,
  UseInterceptors
} from '@nestjs/common';
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { DtoIngredient, RecipeDto } from "../dto/recipe.dto";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { RecipeService } from "./recipe.service";
import {AnyFilesInterceptor, FileInterceptor} from "@nestjs/platform-express";

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
      return await this.recipeService.createRecipe(JSON.parse(JSON.stringify(body)), image, req.user);
    } catch (e) {
      return new NotImplementedException();
    }
  }

  @Get('/one/:id')
  @ApiResponse({ status: 200, description: 'Get one Recipe', type: RecipeDto })
  @ApiResponse({ status: 404, description: 'Not found'})
  async getOneRecipe(@Param() param): Promise<RecipeDto | NotFoundException> {
    try {
      return await this.recipeService.findOne('id', param.id, { relations: ['ingredients'] });
    } catch (e) {
      return !!e ? e : new NotFoundException();
    }
  }

  @Get('/edit/:id')
  @UseGuards(JwtAuthGuard)
  @ApiResponse({ status: 200, description: 'Get one Recipe', type: RecipeDto })
  @ApiResponse({ status: 404, description: 'Not found'})
  async getEditRecipe(@Param() param, @Req() req): Promise<RecipeDto | NotFoundException> {
    try {
      const recipe = await this.recipeService.findOne('id', param.id, { relations: ['ingredients', 'user'] });
      if(recipe.user.id !== req.user.id) throw new ConflictException();
      return recipe;
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

  @Patch('/update')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('image'))
  @ApiResponse({ status: 201, description: 'Recipe update successfully', type: RecipeDto })
  @ApiResponse({ status: 501, description: 'Not Implemented'})
  async updateRecipe(@Body() body, @UploadedFile() image: Express.Multer.File, @Req() req): Promise<RecipeDto>{
    try {
      return this.recipeService.updateRecipe(JSON.parse(JSON.stringify(body)), image, req.user);
    } catch (e) {
      return !!e ? e : new NotFoundException();
    }
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiResponse({ status: 200, description: 'Recipe delete successfully', type: RecipeDto })
  @ApiResponse({ status: 501, description: 'Not Implemented'})
  async deleteRecipe(@Param() param, @Req() req): Promise<{ delete: boolean }> {
    try {
      return { delete: await this.recipeService.deleteRecipe(param.id, req.user.id) };
    } catch (e) {
      return !!e ? e : new NotFoundException();
    }
  }

  @Get('/ingredients')
  @ApiResponse({ status: 200, description: 'Recipe created successfully', type: DtoIngredient })
  @ApiResponse({ status: 404, description: 'Not found'})
  async getAllIngredients(@Query() query): Promise<DtoIngredient[] | NotFoundException> {
    try {
      return this.recipeService.allIngredient(query);
    } catch (e) {
      return !!e ? e : new NotFoundException();
    }
  }

  @Post('/ingredient/create')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(AnyFilesInterceptor())
  @ApiResponse({ status: 201, description: 'Ingredient created successfully', type: RecipeDto })
  @ApiResponse({ status: 501, description: 'Not Implemented'})
  async createIngredient(@Body() body): Promise<DtoIngredient> {
    try {
      return await this.recipeService.createIngredient(JSON.parse(JSON.stringify(body)));
    } catch (e) {
      return !!e ? e : new NotAcceptableException();
    }
  }

  @Patch('/ingredient/update')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(AnyFilesInterceptor())
  @ApiResponse({ status: 201, description: 'Recipe update successfully', type: RecipeDto })
  @ApiResponse({ status: 501, description: 'Not Implemented'})
  async updateIngredients(@Body() body, @Req() req): Promise<DtoIngredient>{
    try {
      return this.recipeService.updateIngredient(JSON.parse(JSON.stringify(body)), req.user);
    } catch (e) {
      return !!e ? e : new NotFoundException();
    }
  }

  @Delete('/ingredient/:id')
  @UseGuards(JwtAuthGuard)
  @ApiResponse({ status: 200, description: 'Recipe delete successfully', type: RecipeDto })
  @ApiResponse({ status: 501, description: 'Not Implemented'})
  async deleteIngredient(@Param() param, @Req() req): Promise<{ delete: boolean }> {
    try {
      return { delete: await this.recipeService.deleteIngredient(param.id, req.user.id) } ;
    } catch (e) {
      return !!e ? e : new NotFoundException();
    }
  }
}
