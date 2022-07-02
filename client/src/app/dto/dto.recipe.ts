export interface DtoRecipe {
  id: string;
  name: string;
  description: string;
  image: string;
  ingredients?: DtoIngredient[]
}

export interface DtoIngredient {
  name: string,
  amount: number,
}

