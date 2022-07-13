import {ApiProperty} from "@nestjs/swagger";
import {RecipeDto} from "./recipe.dto";
import {IsEmail, IsNotEmpty, MinLength} from "class-validator";

export class UserDto {
  @ApiProperty()
  id?: string;

  @ApiProperty()
  @MinLength(3)
  name: string;

  @ApiProperty()
  @IsEmail()
  email?: string;

  @ApiProperty()
  @IsNotEmpty()
  password?: string;

  @ApiProperty()
  avatar?: string;

  @ApiProperty({ required: false, isArray: true } )
  recipe?: RecipeDto[]

  @ApiProperty()
  isActive?: boolean;

  @ApiProperty()
  created_at?: Date;
}