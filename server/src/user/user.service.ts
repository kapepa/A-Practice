import {ConflictException, Injectable, NotFoundException} from '@nestjs/common';
import { UserDto } from "../dto/user.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./user.entity";
import { Repository } from "typeorm";
import { FileService } from "../file/file.service";
import { AuthService } from "../auth/auth.service";
import { MailerService } from "../mailer/mailer.service";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private fileService: FileService,
    private authService: AuthService,
    private mailerService: MailerService,
  ) {}

  async findOne(key: string, val: string, options?: { relations?: string[], select?: string[], withUnselected?: boolean }): Promise<UserDto> {
    return await this.usersRepository.findOne({ where: { [key]: val }, ...options as {} });
  }

  async createUser(user: UserDto, avatar: Express.Multer.File): Promise<boolean> {
    const existUser = await this.findOne('email', user.email);

    if(!!existUser) throw new ConflictException();

    const avatarUrl = !!avatar ? await this.fileService.writeFile(avatar) : '';
    const password = await this.authService.bcryptHash(user.password);
    // await this.mailerService.registrationMail(user.email, user.name);

    return !! await this.usersRepository.save(this.usersRepository.create({...user, password, avatar: avatarUrl}));
  }

  async updateUser(user: UserDto): Promise<UserDto> {
    const { id, ...other } = user;
    await this.usersRepository.update({id}, other);
    return await this.findOne('id', id );
  }

  async deleteUser(id: string): Promise<boolean | NotFoundException> {
    let del = await this.usersRepository.delete({ id });
    return !!del ? true : new NotFoundException()
  }
}
