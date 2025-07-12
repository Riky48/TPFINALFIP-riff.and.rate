import { PartialType } from '@nestjs/mapped-types';
import { CreateInicioDto } from './create-inicio.dto';

export class UpdateInicioDto extends PartialType(CreateInicioDto) {}
