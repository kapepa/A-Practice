import {ApiProperty} from "@nestjs/swagger";
import {RecipeDto} from "./recipe.dto";
import {IsBoolean, IsDate, IsEmail, IsNotEmpty, IsString, MinLength} from "class-validator";

export class UserDto {
  @ApiProperty()
  @IsString()
  id: string;

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
  @IsString()
  avatar?: string;

  @ApiProperty({ required: false, isArray: true } )
  recipe?: RecipeDto[]

  @ApiProperty()
  @IsBoolean()
  isActive?: boolean;

  @ApiProperty()
  @IsDate()
  created_at?: Date;
}