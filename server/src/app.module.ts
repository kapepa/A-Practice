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
      host: '127.0.0.1',
      port: 3306,
      username: 'root',
      password: 'Admin12345',
      database: 'a-recipe',
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
