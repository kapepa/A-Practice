import {Entity, Column, PrimaryGeneratedColumn, CreateDateColumn} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column( { select: false })
  password: string

  @Column({ default: true, select: false })
  isActive: boolean;

  @CreateDateColumn()
  created_at: Date;
}