import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
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
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.inicioService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id',ParseIntPipe) id: number, @Body() updateInicioDto: UpdateInicioDto) {
    return this.inicioService.update(+id, updateInicioDto);
  }

  @Delete(':id')
  remove(@Param('id',ParseIntPipe) id: number) {
    return this.inicioService.remove(+id);
  }
}
