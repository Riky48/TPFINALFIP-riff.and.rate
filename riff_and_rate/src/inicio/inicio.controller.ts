import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { InicioService } from './inicio.service';
import { CreateInicioDto } from './dto/create-inicio.dto';
import { UpdateInicioDto } from './dto/update-inicio.dto';

@Controller('inicio')
export class InicioController {
  constructor(private readonly inicioService: InicioService) {}

  @Post()
  create(@Body() createInicioDto: CreateInicioDto) {
    return this.inicioService.create(createInicioDto);
  }

  @Get()
  findAll() {
    return this.inicioService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.inicioService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateInicioDto: UpdateInicioDto) {
    return this.inicioService.update(+id, updateInicioDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.inicioService.remove(+id);
  }
}
