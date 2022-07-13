import {ApiProperty} from "@nestjs/swagger";
import {UserDto} from "./user.dto";
import {MinLength} from "class-validator";

export class RecipeDto {
  @ApiProperty()
  id?: string;

  @ApiProperty()
  @MinLength(3)
  name: string;

  @ApiProperty()
  @MinLength(3)
  description: string;

  @ApiProperty()
  image: string;

  @ApiProperty({ required: false })
  user?: UserDto;

  @ApiProperty()
  ingredients?: DtoIngredient[];

  @ApiProperty()
  created_at?: Date;
}

export class DtoIngredient {
  @ApiProperty()
  id?: string;

  @ApiProperty()
  @MinLength(3)
  name: string;

  @ApiProperty()
  amount: number;

  @ApiProperty()
  public?: boolean

  @ApiProperty()
  recipe?: RecipeDto[]

  @ApiProperty()
  created_at?: Date;
}