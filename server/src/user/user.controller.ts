import {
  Body,
  Controller, Delete,
  Get,
  NotFoundException,
  NotImplementedException, Param, Patch,
  Post, Req,
  UploadedFile, UseGuards,
  UseInterceptors, UsePipes, ValidationPipe
} from '@nestjs/common';
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { UserDto } from "../dto/user.dto";
import {FileInterceptor} from "@nestjs/platform-express";
import {UserService} from "./user.service";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";

@ApiTags('user')
@Controller('/api/user')
export class UserController {
  constructor(
    private userService: UserService,
  ) {}

  @Post('/create')
  @UsePipes(new ValidationPipe({ transform: true }))
  @UseInterceptors(FileInterceptor('avatar'))
  @ApiResponse({ status: 201, description: 'Profile created successfully', type: UserDto })
  @ApiResponse({ status: 501, description: 'Not Implemented'})
  async createUser(@UploadedFile() avatar: Express.Multer.File, @Body() body: UserDto): Promise<{create: boolean} | NotImplementedException> {
    try {
      const user = JSON.parse(JSON.stringify(body));
      return { create: await this.userService.createUser(user, avatar) }
    } catch (e) {
      return !!e ? e : new NotImplementedException();
    }
  }

  @Get('/one')
  // @UseGuards(JwtAuthGuard)
  // @ApiResponse({ status: 200, description: 'Get Profile', type: UserDto })
  // @ApiResponse({ status: 401, description: 'Not Implemented'})
  async getUser(@Req() req): Promise<UserDto | NotFoundException> {
    try {
      console.log(req)
      return await this.userService.findOne('id', req.user.id);
    } catch (e) {
      return !!e ? e : new NotFoundException();
    }
  }

  @Patch('/update')
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: 200, description: 'Profile update successfully', type: UserDto })
  @ApiResponse({ status: 401, description: 'Not Found'})
  async updateUser(@Body() body): Promise<UserDto>{
    try{
      return await this.userService.updateUser(body);
    } catch (e) {
      return !!e ? e : new NotFoundException();
    }
  }

  @Delete('/delete/:id')
  @UseGuards(JwtAuthGuard)
  @ApiResponse({ status: 200, description: 'delete profile successfully', type: UserDto })
  @ApiResponse({ status: 404, description: 'Not Found'})
  async deleteUser(@Param('id') param): Promise<boolean | NotFoundException>{
    try {
      return await this.userService.deleteUser(param);
    } catch (e) {
      return !!e ? e : new NotFoundException();
    }
  }
}
