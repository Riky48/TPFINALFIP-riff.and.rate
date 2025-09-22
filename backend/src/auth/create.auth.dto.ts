import { IsBoolean, IsEmail, IsString, MinLength } from "class-validator";

export class CreateAuthDto {
    @IsString()
    name: string;
    @IsString()
    lastName: string;
    @IsEmail()
    email: string;
    @IsString()
    @MinLength(6)
    password: string;
    @IsBoolean()
    isAdmin: boolean;
    @IsString()
    code: string;
}