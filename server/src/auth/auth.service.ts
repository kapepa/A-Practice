import {forwardRef, Inject, Injectable} from '@nestjs/common';
import { UserService } from "../user/user.service";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from 'bcrypt';

import * as dotenv from 'dotenv'
import {UserDto} from "../dto/user.dto";

dotenv.config();

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UserService))
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async bcryptHash(password: string): Promise<string> {
    const salt = await bcrypt.genSaltSync(Number(process.env.BCRYPT_SALT));
    return await bcrypt.hashSync(password, salt);
  }

  async bcryptCompare(password: string, hash: string,): Promise<boolean> {
    return await bcrypt.compareSync(password,hash);
  }

  async validateUser(email: string, password: string): Promise<any> {
    const profile = await this.userService.findOne('email', email, { select: ['id', 'name', 'email', 'password', 'avatar'] });
    const compare = await this.bcryptCompare(password, profile.password);

    if (profile && compare) {
      const { password, ...other } = profile;
      return other;
    }
    return null;
  }

  async login(user: UserDto): Promise<{ access_token: string }> {
    const payload = { id: user.id, name: user.name };
    return { access_token: this.jwtService.sign(payload) }
  }
}
