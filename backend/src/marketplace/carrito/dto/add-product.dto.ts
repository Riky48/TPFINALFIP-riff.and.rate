import { IsNumber } from "class-validator";

export class AddProductDto {
  @IsNumber()
  productId: number;

  @IsNumber()
  quantity: number;
}
