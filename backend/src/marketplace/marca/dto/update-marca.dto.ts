import { IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateMarcaDto {
  @IsOptional()
  @IsString()
  @MaxLength(50, { message: 'El nombre no puede superar los 50 caracteres' })
  nombre?: string;
}
