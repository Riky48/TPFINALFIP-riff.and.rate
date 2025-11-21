import { Type } from "class-transformer";
import { IsArray, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateFeedDto {
    @IsNumber()
    @Type(() => Number)
    user_id: number;

    @IsString()
    title: string;

    @IsOptional()
    @IsString()
    content: string;

    @IsOptional()
    @IsArray()
    @IsNumber({}, { each: true })
    multimediaIds?: number[];

    @IsString()
    type: 'post' | 'article' | 'event';
}
