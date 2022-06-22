export interface DtoRecipe {
  name: string;
  description: string;
  image: string;
  ingredients?: DtoIngredient[]
}

export interface DtoIngredient {
  name: string,
  amount: number,
}
