import { Controller, Get, NotFoundException, NotImplementedException, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { UserDto } from "../dto/user.dto";

@ApiTags('user')
@Controller('/api/user')
export class UserController {

  @Post('/create')
  @ApiResponse({ status: 201, description: 'Profile created successfully', type: UserDto })
  @ApiResponse({ status: 501, description: 'Not Implemented'})
  async createUser(): Promise<UserDto |  NotImplementedException> {
    try {
      return {} as UserDto
    } catch (e) {
      return new NotImplementedException();
    }
  }

  @Get('/')
  @ApiResponse({ status: 200, description: 'Get Profile', type: UserDto })
  @ApiResponse({ status: 404, description: 'Not Implemented'})
  async getUser(): Promise<UserDto | NotFoundException> {
    try {
      return {} as UserDto;
    } catch (e) {
      return new NotFoundException()
    }
  }

}
