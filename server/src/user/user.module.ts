import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./user.entity";
import { FileModule } from "../file/file.module";
import { AuthModule } from "../auth/auth.module";
import { MailerModule } from "../mailer/mailer.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    FileModule,
    AuthModule,
    MailerModule,
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
