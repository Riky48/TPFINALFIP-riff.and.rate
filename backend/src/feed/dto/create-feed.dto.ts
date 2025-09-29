import { IsArray, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateFeedDto {
    @IsNumber()
    profile_id: number;
    @IsString()
    title: string;
    @IsOptional()
    @IsString()
    content: string;
    @IsOptional()
    @IsArray()
    @IsNumber({},{ each: true })
    multimediaIds?: number[];
}
