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
  async createUser(@UploadedFile() avatar: Express.Multer.File, @Body() body: UserDto): Promise<boolean |  NotImplementedException> {
    try {
      const user = JSON.parse(JSON.stringify(body));
      return await this.userService.createUser(user, avatar);
    } catch (e) {
      return !!e ? e : new NotImplementedException();
    }
  }

  @Get('/')
  @ApiResponse({ status: 200, description: 'Get Profile', type: UserDto })
  @ApiResponse({ status: 404, description: 'Not Implemented'})
  async getUser(): Promise<UserDto | NotFoundException> {
    try {
      return {} as UserDto;
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
