import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { IsEmail, IsNotEmpty } from 'class-validator';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Column()
  @IsNotEmpty()
  password: string;
}