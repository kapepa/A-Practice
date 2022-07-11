import {ApiProperty} from "@nestjs/swagger";
import {UserDto} from "./user.dto";

export class RecipeDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  image: string;

  @ApiProperty({ required: false })
  user: UserDto;

  @ApiProperty()
  ingredients?: DtoIngredient[];

  @ApiProperty()
  created_at?: Date;
}

export class DtoIngredient {
  @ApiProperty()
  name: string;

  @ApiProperty()
  amount: number;

  @ApiProperty()
  created_at?: Date;
}