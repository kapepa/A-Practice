import {ApiProperty} from "@nestjs/swagger";
import {RecipeDto} from "./recipe.dto";

export class UserDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  email?: string;

  @ApiProperty()
  password?: string

  @ApiProperty({ required: false, isArray: true } )
  recipe?: RecipeDto[]

  @ApiProperty()
  isActive?: boolean;

  @ApiProperty()
  created_at?: Date;
}