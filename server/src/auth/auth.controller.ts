import {Controller, Post, Req, UnauthorizedException, UseGuards} from '@nestjs/common';
import { LocalAuthGuard } from "./local-auth.guard";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { UserDto } from "../dto/user.dto";
import { AuthService } from "./auth.service";

@ApiTags('auth')
@Controller('/api/auth')
export class AuthController {
  constructor(
    private authService: AuthService
  ) {}

  @Post('login')
  @UseGuards(LocalAuthGuard)
  @ApiResponse({ status: 200, description: 'Login user successfully, return token.', type: UserDto })
  @ApiResponse({ status: 401, description: 'Unauthorized'})
  async loginUser(@Req() req): Promise<string | UnauthorizedException> {
    try {
      return this.authService.login(req.user);
    } catch (e) {
      return !!e ? e : new UnauthorizedException();
    }
  }

}
