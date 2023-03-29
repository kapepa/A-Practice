import { Module } from '@nestjs/common';
import { RecipeModule } from './recipe/recipe.module';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ingredients, Recipe } from "./recipe/recipe.entity";
import { User } from "./user/user.entity";
import { FileModule } from './file/file.module';
import { ServeStaticModule } from "@nestjs/serve-static";
import { join } from "path";
import { AuthModule } from './auth/auth.module';
import { MailerModule } from './mailer/mailer.module';

import * as dotenv from 'dotenv';


dotenv.config();

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'static'),
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.MYSQL_HOST,
      port: Number(process.env.MYSQL_POST),
      username: process.env.MYSQL_USERNAME,
      password: process.env.MYSQL_ROOT_PASSWORD,
      database: process.env.MYSQL_DATABASE,
      ssl: true,
      extra: {
        ssl: {
          rejectUnauthorized: false,
        },
      },
      entities: [
        User,
        Recipe,
        Ingredients,
      ],
      synchronize: true,
    }),
    RecipeModule,
    UserModule,
    FileModule,
    AuthModule,
    MailerModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
