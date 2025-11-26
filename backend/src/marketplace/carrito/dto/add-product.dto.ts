import { IsNumber } from "class-validator";

export class AddProductDto {
  @IsNumber()
  productoId: number;

  @IsNumber()
  cantidad: number;
}
