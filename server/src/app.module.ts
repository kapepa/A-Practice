import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { RecipeModule } from './recipe/recipe.module';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ingredients, Recipe } from "./recipe/recipe.entity";
import { User } from "./user/user.entity";

import * as dotenv from 'dotenv';

dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.MYSQL_HOST,
      port: Number(process.env.MYSQL_POST),
      username: process.env.MYSQL_USERNAME,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DB,
      entities: [
        User,
        Recipe,
        Ingredients,
      ],
      synchronize: true,
    }),
    RecipeModule,
    UserModule
  ],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
