import { Type } from "class-transformer";
import { IsInt, IsNotEmpty, IsString, IsUrl } from "class-validator";

export class CreatePostDto {
    @Type(() => Number)
    @IsInt()
    userId: number;

    @IsString()
    @IsNotEmpty()
    descripcion: string;

    // @IsUrl()
    // multimedia_url: string;

}
