export class RecipeDto {
  id: string;
  name: string;
  description: string;
  image: string;
  ingredients?: DtoIngredient[]
}

export class DtoIngredient {
  name: string;
  amount: number;
}