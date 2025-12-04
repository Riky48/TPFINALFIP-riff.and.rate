import { IsBoolean, IsDateString, IsEmail, IsNumber, IsString, Length } from 'class-validator';

export class CreatePerfilDto {
  @IsNumber()
  id: number;

  @IsBoolean()
  gender: boolean;

  @IsString()
  @Length(0, 25)
  phone_number: string;

  @IsDateString()
  birthday: string;

  @IsString()
  @Length(0, 255)
  bio: string;

  @IsString()
  image: string;

  @IsString()
  image_header: string;

  @IsBoolean()
  is_premium: boolean;

  @IsEmail()
  @Length(0, 60)
  email_perfil: string;

  @IsBoolean()
  is_verified: boolean;

  @IsNumber()
  country_id: number;
}