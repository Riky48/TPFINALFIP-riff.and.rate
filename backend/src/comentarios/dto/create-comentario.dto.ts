import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateComentarioDto {
    
    @IsNotEmpty()
    @IsString()
    content:string;

    @IsNumber()
    @IsNotEmpty()
    id_post:number;

}
