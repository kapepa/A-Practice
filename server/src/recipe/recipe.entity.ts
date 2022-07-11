import {Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, OneToMany, ManyToOne} from 'typeorm';
import {User} from "../user/user.entity";

@Entity(
  { name: 'recipe' },
)
export class Recipe {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  image: string;

  @ManyToOne(() => User, user => user.recipe)
  user: User;

  @OneToMany(() => Ingredients, ingredients => ingredients.user)
  ingredients: Ingredients[];

  @CreateDateColumn({ select: false })
  created_at: Date;
}

@Entity({ name: 'ingredients' })
export class Ingredients {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  amount: number;

  @ManyToOne(() => Recipe, recipe => recipe.ingredients)
  user: Recipe;

  @CreateDateColumn({ select: false })
  created_at: Date;
}