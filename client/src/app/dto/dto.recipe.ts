export interface DtoRecipe {
  id: string;
  name: string;
  description: string;
  image: string;
  ingredients?: DtoIngredient[]
}

export interface DtoIngredient {
  id?: string;
  name: string,
  amount: number,
  public?: boolean
  recipe?: DtoRecipe;
  created_at?: Date;
}

