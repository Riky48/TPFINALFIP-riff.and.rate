import { PartialType } from '@nestjs/mapped-types';
import { CreateFeedDto } from './create-feed.dto';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateFeedDto extends PartialType(CreateFeedDto) {

    @IsNumber()
    id_user:number;
    
    @IsString()
    @IsOptional()
    title:string;
    
    @IsString()
    @IsOptional()
    content:string;
}
