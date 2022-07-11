import {Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, OneToMany, ManyToOne} from 'typeorm';

@Entity(
  { name: 'recipe' },
)
export class Recipe {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  image: string;

  @OneToMany(() => Ingredients, ingredients => ingredients.user)
  ingredients: Ingredients[];

  @CreateDateColumn({ select: false })
  created_at: Date;
}

@Entity({ name: 'ingredients' })
export class Ingredients {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  name: string;

  @Column()
  amount: number;

  @ManyToOne(() => Recipe, recipe => recipe.ingredients)
  user: Recipe;

  @CreateDateColumn({ select: false })
  created_at: Date;
}