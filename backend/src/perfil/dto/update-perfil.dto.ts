import { IsBoolean, IsDateString, IsEmail, IsInt, IsOptional, IsString, Length } from 'class-validator';

export class UpdatePerfilDto {
  @IsOptional()
  @IsBoolean()
  gender?: boolean;

  @IsOptional()
  @IsString()
  @Length(0, 25)
  phone_number?: string;

  @IsOptional()
  @IsDateString()
  birthday?: string;

  @IsOptional()
  @IsString()
  @Length(0, 255)
  bio?: string;

  @IsOptional()
  @IsString()
  @Length(0, 255)
  image?: string;

  @IsOptional()
  @IsString()
  @Length(0, 255)
  image_header?: string;

  @IsOptional()
  @IsBoolean()
  is_premium?: boolean;

  @IsOptional()
  @IsEmail()
  @Length(0, 60)
  email_perfil?: string;

  @IsOptional()
  @IsBoolean()
  is_verified?: boolean;

  @IsOptional()
  @IsInt()
  country_id?: number;
}