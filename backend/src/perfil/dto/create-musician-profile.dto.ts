import { IsOptional, IsString, IsInt } from 'class-validator';

export class CreateMusicianProfileDto {
  @IsString()
  instrument: string;

  @IsInt()
  experience_years: number;

  @IsString()
  skill_level: string;

  @IsOptional()
  @IsString()
  influences?: string;

  @IsOptional()
  @IsString()
  projects?: string;

  @IsOptional()
  @IsString()
  availability?: string;

  @IsOptional()
  @IsString()
  music_link?: string;

  @IsOptional()
  @IsString()
  equipment?: string;

  @IsOptional()
  @IsString()
  genres?: string;
}