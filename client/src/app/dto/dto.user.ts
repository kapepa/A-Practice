import {DtoRecipe} from "./dto.recipe";

export interface DtoUser {
  id?: string;
  name: string;
  email?: string;
  password?: string;
  avatar?: string;
  recipe?: DtoRecipe[]
  isActive?: boolean;
  created_at?: Date;
}
