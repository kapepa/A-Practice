import {Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, OneToMany, JoinTable, ManyToOne, ManyToMany} from 'typeorm';
import {User} from "../user/user.entity";
import {IsBoolean, IsDate, IsInt, IsString, MinLength} from "class-validator";

@Entity(
  { name: 'recipe' },
)
export class Recipe {
  @PrimaryGeneratedColumn('uuid')
  @IsString()
  id: string;

  @Column()
  @MinLength(3)
  name: string;

  @Column()
  @IsString()
  description: string;

  @Column()
  @IsString()
  image: string;

  @ManyToOne(() => User, user => user.recipe)
  user: User;

  @ManyToMany(() => Ingredients, ingredients => ingredients.recipe)
  @JoinTable({ name: 'recipe_ingredients' })
  ingredients: Ingredients[];

  @CreateDateColumn({ select: false })
  @IsDate()
  created_at: Date;
}

@Entity({ name: 'ingredients' })
export class Ingredients {
  @PrimaryGeneratedColumn('uuid')
  @IsString()
  id: string;

  @Column()
  @MinLength(3)
  name: string;

  @Column()
  @IsInt()
  amount: number;

  @Column({ default: false })
  @IsBoolean()
  public: boolean

  @ManyToMany(() => Recipe, recipe => recipe.ingredients)
  recipe: Recipe[];

  @CreateDateColumn({ select: false })
  @IsDate()
  created_at: Date;
}