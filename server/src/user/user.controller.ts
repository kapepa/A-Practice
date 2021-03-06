import {
  Body,
  Controller,
  Get,
  NotFoundException,
  NotImplementedException, Patch,
  Post, Req,
  UploadedFile, UseGuards,
  UseInterceptors
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
  @UseInterceptors(FileInterceptor('avatar'))
  @ApiResponse({ status: 201, description: 'Profile created successfully', type: UserDto })
  @ApiResponse({ status: 501, description: 'Not Implemented'})
  async createUser(@UploadedFile() avatar: Express.Multer.File, @Body() body: UserDto): Promise<{create: boolean} |  NotImplementedException> {
    try {
      const user = JSON.parse(JSON.stringify(body));
      return { create: await this.userService.createUser(user, avatar) }
    } catch (e) {
      return !!e ? e : new NotImplementedException();
    }
  }

  @Get('/')
  @UseGuards(JwtAuthGuard)
  @ApiResponse({ status: 200, description: 'Get Profile', type: UserDto })
  @ApiResponse({ status: 404, description: 'Not Implemented'})
  async getUser(@Req() req): Promise<UserDto | NotFoundException> {
    try {
      return await this.userService.findOne('id', req.user.id);
    } catch (e) {
      return !!e ? e : new NotFoundException();
    }
  }

  @Patch('/update')
  @UseGuards(JwtAuthGuard)
  @ApiResponse({ status: 201, description: 'Profile update successfully', type: UserDto })
  @ApiResponse({ status: 501, description: 'Not Found'})
  async updateUser(@Body() body, @Req() req): Promise<void>{
    try{
      console.log(req.user)
    } catch (e) {
      return !!e ? e : new NotFoundException();
    }
  }
}
