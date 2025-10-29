// src/perfil/dto/create-perfil.dto.ts
import { IsBoolean, IsDateString, IsEmail, IsInt, IsOptional, IsString, Length } from 'class-validator';

export class CreatePerfilDto {
  @IsInt()
  id_user: number;

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
  @Length(0, 255)
  image: string;

  @IsString()
  @Length(0, 255)
  image_header: string;

  @IsBoolean()
  is_premium: boolean;

  @IsEmail()
  @Length(0, 60)
  email_perfil: string;

  @IsBoolean()
  is_verified: boolean;

  @IsInt()
  country_id: number;
}