import { IsEmail, IsNotEmpty } from 'class-validator';

export class RegisterAuthDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  lastName: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;


}
