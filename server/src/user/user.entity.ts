import {Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, OneToMany} from 'typeorm';
import {Recipe} from "../recipe/recipe.entity";

@Entity(
  { name: 'user' }
)
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column( { select: false })
  password: string;

  @Column()
  avatar: string

  @OneToMany(() => Recipe, recipe => recipe.user)
  recipe: Recipe[]

  @Column({ default: true, select: false })
  isActive: boolean;

  @CreateDateColumn( { select: false } )
  created_at: Date;
}