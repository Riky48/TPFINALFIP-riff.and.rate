import { Type } from "class-transformer";
import { IsInt, IsNotEmpty, IsString } from "class-validator";

export class CreatePostDto {
    @Type(() => Number)
    @IsInt()
    userId: number;

    @IsString()
    descripcion: string;
}
