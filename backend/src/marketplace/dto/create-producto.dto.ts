import { IsNotEmpty, IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateProductoDto {
  @IsNotEmpty()
  @IsString()
  nombre: string;

  @IsNotEmpty()
  @IsString()
  descripcion: string;

  @IsNotEmpty()
  @IsNumber()
  precio: number;

  @IsNotEmpty()
  @IsNumber()
  stock: number;

  @IsOptional()
  @IsString()
  marca?: string;

  @IsOptional()
  @IsString({ each: true })
  categorias?: string[];

  @IsOptional()
  @IsString()
  img?: string;

  @IsOptional()
  @IsNumber()
  userId?: number;
}
