import { Type } from "class-transformer";
import { IsDate, IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreatePostDto {
    @Type(() => Number)
    @IsInt()
    @IsOptional()
    id_post: number;

    @Type(() => Number)
    @IsInt()
    @IsNotEmpty()
    id_user: number;


    @IsString()
    @IsOptional()
    title:string;

    @IsString()
    content:string;

    @IsDate()
    @IsOptional()
    created_at:Date;
}
