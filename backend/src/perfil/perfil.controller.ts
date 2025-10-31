// src/perfil/perfil.controller.ts
import { Controller, Get, Post, Patch, Delete, Param, Body } from '@nestjs/common';
import { PerfilService } from './perfil.service';
import { CreatePerfilDto } from './dto/create-perfil.dto';
import { UpdatePerfilDto } from './dto/update-perfil.dto';

@Controller('perfil')
export class PerfilController {
  constructor(private readonly perfilService: PerfilService) {}

  @Post()
  create(@Body() createDto: CreatePerfilDto) {
    return this.perfilService.create(createDto);
  }

  @Get()
  findAll() {
    return this.perfilService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.perfilService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateDto: UpdatePerfilDto) {
    return this.perfilService.update(id, updateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.perfilService.remove(id);
  }
}
