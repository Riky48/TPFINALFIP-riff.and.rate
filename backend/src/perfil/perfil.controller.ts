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

  @Get(':id_user')
  findOne(@Param('id_user') id_user: number) {
    return this.perfilService.findOne(id_user);
  }

  @Patch(':id_user')
  update(@Param('id_user') id_user: number, @Body() updateDto: UpdatePerfilDto) {
    return this.perfilService.update(id_user, updateDto);
  }

  @Delete(':id_user')
  remove(@Param('id_user') id_user: number) {
    return this.perfilService.remove(id_user);
  }
}
