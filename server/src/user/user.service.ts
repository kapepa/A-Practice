import {Injectable, NotImplementedException, UnauthorizedException} from '@nestjs/common';
import { UserDto } from "../dto/user.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./user.entity";
import { Repository } from "typeorm";
import { FileService } from "../file/file.service";
import { AuthService } from "../auth/auth.service";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private fileService: FileService,
    private authService: AuthService,
  ) {}

  async findOne(key: string, val: string, options?: { relations?: string[], select?: string[], withUnselected?: boolean }): Promise<UserDto> {
    return await this.usersRepository.findOne({ where: { [key]: val }, ...options as {} });
  }

  async createUser(user: UserDto, avatar: Express.Multer.File): Promise<boolean> {
    const existUser = await this.findOne('email', user.email);
    if(!!existUser) throw new UnauthorizedException()

    const avatarUrl = !!avatar ? await this.fileService.writeFile(avatar) : '';
    const password = await this.authService.bcryptHash(user.password);

    return !! await this.usersRepository.save(this.usersRepository.create({...user, password, avatar: avatarUrl}));
  }

}
